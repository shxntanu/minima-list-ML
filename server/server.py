import os
import json
import logging
# import ngrok
import numpy as np
import pandas as pd
import spotipy
from collections import defaultdict
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.manifold import TSNE
from sklearn.decomposition import PCA
from sklearn.metrics import euclidean_distances
from spotipy.oauth2 import SpotifyClientCredentials
from scipy.spatial.distance import cdist
from http.server import HTTPServer, BaseHTTPRequestHandler
from collections import defaultdict
from dotenv import load_dotenv

load_dotenv()

def get_decade(year):
    period_start = int(year/10) * 10
    decade = '{}s'.format(period_start)
    return decade

# Load the data

data = pd.read_csv("data/data.csv")
genre_data = pd.read_csv('data/data_by_genres.csv')
year_data = pd.read_csv('data/data_by_year.csv')

# Define the feature names

feature_names = ['acousticness', 'danceability', 'energy', 'instrumentalness',
       'liveness', 'loudness', 'speechiness', 'tempo', 'valence','duration_ms','explicit','key','mode','year']

number_cols = ['valence', 'year', 'acousticness', 'danceability', 'duration_ms', 'energy', 'explicit',
 'instrumentalness', 'key', 'liveness', 'loudness', 'mode', 'popularity', 'speechiness', 'tempo']

sound_features = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'valence']

# Define the target variable

X, y = data[feature_names], data['popularity']

# Create a list of the feature names

features = np.array(feature_names)
data['decade'] = data['year'].apply(get_decade)

# Create a pipeline to scale the data and fit a KMeans model

cluster_pipeline = Pipeline([('scaler', StandardScaler()), ('kmeans', KMeans(n_clusters=10))])
X = genre_data.select_dtypes(np.number)
cluster_pipeline.fit(X)
genre_data['cluster'] = cluster_pipeline.predict(X)

tsne_pipeline = Pipeline([('scaler', StandardScaler()), ('tsne', TSNE(n_components=2, verbose=1))])
genre_embedding = tsne_pipeline.fit_transform(X)

song_cluster_pipeline = Pipeline([('scaler', StandardScaler()),
                                  ('kmeans', KMeans(n_clusters=20,
                                   verbose=False))
                                 ], verbose=False)

X = data.select_dtypes(np.number)
number_cols = list(X.columns)
song_cluster_pipeline.fit(X)
song_cluster_labels = song_cluster_pipeline.predict(X)
data['cluster_label'] = song_cluster_labels

pca_pipeline = Pipeline([('scaler', StandardScaler()), ('PCA', PCA(n_components=2))])
song_embedding = pca_pipeline.fit_transform(X)

# Create a Spotify API object

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=os.environ["SPOTIFY_CLIENT_ID"],
                                                           client_secret=os.environ["SPOTIFY_CLIENT_SECRET"]))

def find_song(name, year):
    song_data = defaultdict()
    results = sp.search(q= 'track: {} year: {}'.format(name,year), limit=1)
    if results['tracks']['items'] == []:
        return None

    results = results['tracks']['items'][0]
    track_id = results['id']
    audio_features = sp.audio_features(track_id)[0]

    song_data['name'] = [name]
    song_data['year'] = [year]
    song_data['explicit'] = [int(results['explicit'])]
    song_data['duration_ms'] = [results['duration_ms']]
    song_data['popularity'] = [results['popularity']]

    for key, value in audio_features.items():
        song_data[key] = value

    return pd.DataFrame(song_data)


def get_song_data(song, spotify_data):
    """
    This function retrieves the audio features of a song from the Spotify API.

    Args:
        song: A dictionary containing the name and year of the song.
        spotify_data: A DataFrame containing the audio features of songs.

    Returns:
        A DataFrame containing the audio features of the song.
    """

    try:
        song_data = spotify_data[(spotify_data['name'] == song['name'])
                                & (spotify_data['year'] == song['year'])].iloc[0]
        # print(song_data, '\n')
        return song_data

    except IndexError:
        return find_song(song['name'], song['year'])

def is_list_of_list(data):
    """
    This function checks if a variable is a list of lists (nested list).

    Args:
        data: The variable to be checked.

    Returns:
        True if the variable is a list of lists, False otherwise.
    """
    return isinstance(data, list) and all(isinstance(item, list) for item in data)

def get_mean_vector(song_list, spotify_data):
    """
    This function calculates the mean of the audio features of a list of songs.

    Args:
        song_list: A list of dictionaries containing the name and year of the songs.
        spotify_data: A DataFrame containing the audio features of songs.

    Returns:
        A NumPy array containing the mean of the audio features of the songs.
    """

    song_vectors = []

    count = 0
    for song in song_list:
        count += 1
        song_data = get_song_data(song, spotify_data)
        # print(song_data, '\n')
        if song_data is None:
            # print('Warning: {} does not exist in Spotify or in database'.format(song['name']))
            continue
        song_vector = song_data[number_cols].values
        if count == 5:
            song_vector = song_vector[0]
        # print("\nSong Vector:\n", song_vector, "\nSong Vector Length: ", len(song_vector),'\n')
        song_vectors.append(song_vector)

    song_vec_list = list(song_vectors)
    # print("\nSong Vectors:\n", song_vec_list)
    # print("\nLength of Song vectors: ", len(song_vec_list),'\n')
    song_matrix = np.array(list(song_vectors))
    return np.mean(song_matrix, axis=0)

def flatten_dict_list(dict_list):
    """
    This function flattens a list of dictionaries into a single dictionary.
    
    Args:
        dict_list: A list of dictionaries.
        
    Returns:
        A dictionary containing the flattened data.
    """

    flattened_dict = defaultdict()
    for key in dict_list[0].keys():
        flattened_dict[key] = []

    for dictionary in dict_list:
        for key, value in dictionary.items():
            flattened_dict[key].append(value)

    return flattened_dict


def recommend_songs( song_list, spotify_data, n_songs=10):

    """
    This function recommends songs based on a list of songs.

    Args:
        song_list: A list of dictionaries containing the name and year of the songs.
        spotify_data: A DataFrame containing the audio features of songs.
        n_songs: The number of songs to recommend.

    Returns:
        A list of dictionaries containing the recommended songs.
    """

    metadata_cols = ['name', 'year', 'artists']
    song_dict = flatten_dict_list(song_list)

    song_center = get_mean_vector(song_list, spotify_data)
    scaler = song_cluster_pipeline.steps[0][1]
    scaled_data = scaler.transform(spotify_data[number_cols])
    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    distances = cdist(scaled_song_center, scaled_data, 'cosine')
    index = list(np.argsort(distances)[:, :n_songs][0])

    rec_songs = spotify_data.iloc[index]
    rec_songs = rec_songs[~rec_songs['name'].isin(song_dict['name'])]
    return rec_songs[metadata_cols].to_dict(orient='records')


class RequestHandler(BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        body = bytes("Hello", "utf-8")
        self.protocol_version = "HTTP/1.1"
        self.send_response(200)
        self.send_header("Content-Length", len(body))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):

        """
        Input format for body of post request:

        [
            {
                "name": "song_name" -> str,
                "year": song_year -> int
            },
            ...
        ]
        """
        
        if self.path == '/recommend':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_data = json.loads(post_data.decode('utf-8'))
            print("Received POST data:", post_data)
            
            song_list = post_data
            rec_songs = recommend_songs(song_list, data)
            response = json.dumps(rec_songs)
            response = bytes(response, "utf-8")
            self.send_response(200)
            self.end_headers()
            self.wfile.write(response)
        
        else:
            self.send_response(404)
            self.end_headers()
            response = bytes("404 Not Found", "utf-8")
            self.wfile.write(response)


logging.basicConfig(level=logging.INFO)
print("Starting server...")
server = HTTPServer(("localhost", 8000), RequestHandler)
print("Server started on port 8000")
# ngrok.listen(server)
server.serve_forever()
