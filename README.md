# Minima-list

A unsupervised learning model which analyses playlists and gives recommendations.

<img width="300px" src="https://media.giphy.com/media/tqfS3mgQU28ko/giphy.gif" />

### Why

We created this project to see if we can actually understand the musical patterns of a listener with their playlist as source and what factors are really useful in determining the taste and interest of the listener.
And also to get some experience in basic ML and hosting a model.

# Client

## Getting Started

1. Clone or download the repository.
2. Create a .env file in the project directory:
   Add the following lines, replacing the placeholders with your actual Spotify API credentials:

```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=YOUR_CLIENT_ID
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

For instructions on obtaining your Spotify API credentials, refer to <https://developer.spotify.com/documentation/web-api/>

# Backend (ML + Server)

## What you'll need

Python 3.x (<https://www.python.org/downloads/>)

Necessary libraries:

-   pandas
-   numpy
-   sklearn
-   flask
-   spotipy
-   dotenv
-   http.server

## Getting Started

1. Clone or download the repository.
2. Create a .env file in the project directory:
   Add the following lines, replacing the placeholders with your actual Spotify API credentials:

```env
SPOTIFY_CLIENT_ID="YOUR_CLIENT_ID"
SPOTIFY_CLIENT_SECRET="YOUR_CLIENT_SECRET"
NGROK_AUTHTOKEN="YOUR_NGROK_AUTHTOKEN"
```

For instructions on obtaining your Spotify API credentials, refer to <https://developer.spotify.com/documentation/web-api/>

3. Run the code: Execute python app.py (or the main script name) in your terminal.

## How to Use the Recommendation System

Start the server

```python
python3 final.py
```

You will get an NGROK server link on which the server has been hosted. Use this link to make requests to the server.

Prepare a list of songs: Create a JSON-formatted list containing information about the songs you want recommendations for, including their names and release years:

```JSON
[
   {
      "name": "Castle on the Hill",
      "year": 2017
   },
   {
      "name": "Look What You Made Me Do",
      "year": 2017
   }
]
```

Send the list to the **'/recommend'** API endpoint:

Using cURL (for command line):

```bash
curl -X POST http://<link>/recommend
      -H "Content-Type: application/json"
      -d '[{"name": "Castle on the Hill", "year": 2017}, {"name": "Look What You Made Me Do", "year": 2017}]'
```

Using Postman or other tools:

Set the request method to POST and the URL to <http://localhost:(port)/recommend>.
Set the Content-Type header to application/json.
Paste the JSON list of songs in the request body.

The system will respond with a JSON list of recommended songs, including their names, artists, and years.

```JSON
[
    {
        "name": "Lovesick Girls",
        "year": 2020,
        "artists": "['BLACKPINK']"
    },
    {
        "name": "HOME",
        "year": 2019,
        "artists": "['BTS']"
    },
    {
        "name": "Sugar (feat. Francesco Yates)",
        "year": 2015,
        "artists": "['Robin Schulz', 'Francesco Yates']"
    },
    {
        "name": "MAGO",
        "year": 2020,
        "artists": "['GFRIEND']"
    },
    {
        "name": "Run",
        "year": 2016,
        "artists": "['BTS']"
    },
    {
        "name": "In My Blood",
        "year": 2018,
        "artists": "['Shawn Mendes']"
    },
    {
        "name": "カワキヲアメク",
        "year": 2019,
        "artists": "['美波']"
    },
    {
        "name": "Hey Brother",
        "year": 2013,
        "artists": "['Avicii']"
    },
    {
        "name": "Hot Stuff",
        "year": 2020,
        "artists": "['Kygo', 'Donna Summer']"
    },
    {
        "name": "紅蓮華",
        "year": 2019,
        "artists": "['LiSA']"
    }
]
```

Note: To properly utilize the code, you'll need a Spotify developer account and a Spotify app created to obtain your API credentials. Please refer to Spotify's documentation for detailed instructions: <https://developer.spotify.com/documentation/web-api/>
