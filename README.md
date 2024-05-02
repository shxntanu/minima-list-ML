# Minima-list

A unsupervised learning model which gives recommendations based on a given song.

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

3. cd to client directory
4. Run

    ```bash
    # Install dependencies
    npm install

    # Start the development server
    npm run dev
    ```

## Output

![Home Page](assets/screenshot.png)

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
-   gunicorn
-   http.server

## Getting Started

1. Clone or download the repository.
2. Create a .env file in the project directory:
   Add the following lines, replacing the placeholders with your actual Spotify API credentials:

    ```env
    SPOTIFY_CLIENT_ID="YOUR_CLIENT_ID"
    SPOTIFY_CLIENT_SECRET="YOUR_CLIENT_SECRET"
    ```

3. Create a virtual environment in the project directory and activate it:

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

4. Install the required libraries:

    ```bash
    pip install -r requirements.txt
    ```

## How to Use the Recommendation System

1. Start the server

   ```python
   gunicorn app:app
   ```

2. Prepare a list of songs: Create a JSON-formatted list containing information about the songs you want recommendations for, including their names and release years:

   ```JSON
   [
      {
         "name": "Look What You Made Me Do",
         "year": 2017
      }
   ]
   ```

3. Send the list to the **'/recommend'** API endpoint:

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
       "name": "Look What You Made Me Do",
       "year": 2017,
       "artists": [
         "Taylor Swift"
       ]
     },
     {
       "name": "Believer",
       "year": 2017,
       "artists": [
         "Imagine Dragons"
       ]
     },
     {
       "name": "New Rules",
       "year": 2017,
       "artists": [
         "Dua Lipa"
       ]
     },
     {
       "name": "One Kiss (with Dua Lipa)",
       "year": 2018,
       "artists": [
         "Calvin Harris",
         "Dua Lipa"
       ]
     },
     {
       "name": "Don't Start Now",
       "year": 2019,
       "artists": [
         "Dua Lipa"
       ]
     }
   ]
   ```

Note: To properly utilize the code, you'll need a Spotify developer account and a Spotify app created to obtain your API credentials. Please refer to Spotify's documentation for detailed instructions: <https://developer.spotify.com/documentation/web-api/>

## Future Scope

- Implement Mood based song recommendation.
- Implement a user-specific recommendation system.

## License

This repository is licensed under the [MIT License.](LICENSE)

## Contact

If you have any questions or suggestions, feel free to contact [Shantanu Wable.](https://linkedin.com/in/shxntanu)
