import React, { useEffect, useState } from 'react';
import styles from './MovieResultCard.module.css';

const MovieResultCard = (props) =>  {

const [movieGenres, setMovieGenres] = useState(null);

useEffect(() => {    
      setProperGenres();
});

const setProperGenres = () => {
  const g = props.movie.genre_ids.map(el => {
    return props.genres.find(genre => genre.id === el).name;
  });
  setMovieGenres(g.join(', '));
}

const releaseDate = new Date(props.movie.release_date);

return (
  <div className={styles.Card}>
   
    <div>
      <div className={styles.Title} title={props.movie.title}>{props.movie.title}</div>
      <div className={styles.Release}>{releaseDate.getFullYear()}</div>
      <div className={styles.Genres}>{movieGenres}</div>
    </div>
    <div>
    <div className={styles.Score}>
        <i className={styles.StarIcon}></i>
        {props.movie.vote_average.toFixed(1)}
      </div>
    </div>
  </div>
);
};

export default MovieResultCard;
