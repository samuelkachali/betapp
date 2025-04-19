from flask import Flask, request, jsonify, send_from_directory
import os
from flask_cors import CORS

app = Flask(__name__, static_folder='../movie-recommender/build')
CORS(app)

# Mock dataset of movies and recommendations
MOVIE_DATABASE = {
    'Inception': ['Interstellar', 'The Prestige', 'Memento'],
    'The Matrix': ['Inception', 'Blade Runner', 'The Fifth Element'],
    'Avatar': ['Interstellar', 'Guardians of the Galaxy', 'Star Wars'],
    'Interstellar': ['Inception', 'The Martian', 'Gravity'],
}

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    liked_movies = data.get('movies', [])

    # Generate recommendations based on liked movies
    recommendations = set()
    for movie in liked_movies:
        recommendations.update(MOVIE_DATABASE.get(movie, []))

    return jsonify({'recommendations': list(recommendations)})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)