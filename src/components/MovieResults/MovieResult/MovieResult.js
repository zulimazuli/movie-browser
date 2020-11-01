import React, { Component } from 'react';
// import ActionButton from './ActionButton/ActionButton';
import styles from './MovieResult.module.css';
import MovieResultCard from './MovieResultCard/MovieResultCard';
import PosterWrapper from './PosterWrapper/PosterWrapper';

class MovieResult extends Component {
  state = {
    isFavorite: false
  }
 

  render() { 
    // let buttonFunction = this.state.isFavorite ? "Remove" : "Add";
    return (
      <div className={styles.MovieResult}>
        <div>
          <PosterWrapper poster={this.props.movie.poster_path} title={this.props.movie.title} />
        </div>
        <MovieResultCard movie={this.props.movie} genres={this.props.genres} />
        {/* <div className={styles.Actions}>
          <ActionButton function={buttonFunction} />
        </div> */}
      </div>
    );
  }
}

export default MovieResult;
