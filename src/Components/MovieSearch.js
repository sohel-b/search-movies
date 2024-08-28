
import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';
import searchIcon from '../Images/search.png';



function MovieSearch() {

    const [movieName, setMovieName] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a7fbf2d6d727835198a74874d82cf6c8&query=${movieName}`);
            setMovies(response.data.results);
            setError('');
        } catch (err) {
            setError('Movie not found or an error occurred');
            setMovies([]);
        }
    };
    

    const handleInputChange = (event) => {
        setMovieName(event.target.value);
    };

    const handleSearch = () => {
        if (movieName) {
            fetchMovieDetails();
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="movie-search">
            <div className="input-container">
                <input
                    type="text"
                    value={movieName}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter movie name"
                />
                <img src={searchIcon} alt="Search" className="search-icon" />
            </div>
            <button style={{ margin: '20px',padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleSearch}>
                Search
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="movie-cards-container">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div className="movie-card" key={movie.id}>
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-card-img"
                                />
                            )}
                            <div className="movie-card-info">
                                <h3>{movie.title}</h3>
                                <p className='overview'><strong>Overview :</strong> {movie.overview}</p>
                                {/* <p><strong>Genres :</strong> {movie?.genre_ids.join(', ')}</p> */}
                                <p><strong>Genres :</strong> {movie.genre_ids && movie.genre_ids.length > 0 ? movie.genre_ids.join(', ') : 'N/A'}</p>
                                <p><strong>Rating :</strong> {movie.vote_average}</p>
                                <p><strong>Release Date :</strong> {movie.release_date}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    );
}

export default MovieSearch;
