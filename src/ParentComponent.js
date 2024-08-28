import React, { useState } from 'react';
import MovieSearch from './Components/MovieSearch';
import './styles.css';

function ParentComponent() {

    const [activButton, setActiveButton] = useState(null);
    
    const handleMoviesButton = () => {
        setActiveButton('movies');
      };

    return (
        <div className="parent-container">
          {activButton === null && (
            <div className="button-group">
              <button onClick={handleMoviesButton} className="show-button">
                About Movies
              </button>
            </div>
          )}
    
          {activButton === 'movies' && <MovieSearch />}
        </div>
      );
}

export default ParentComponent;
