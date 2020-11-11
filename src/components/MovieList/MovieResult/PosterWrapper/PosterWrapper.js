import React from 'react';
import styles from './PosterWrapper.module.css';

const posterWrapper = (props) => (
    <div className={styles.PosterWrapper}>
      <img src={'http://image.tmdb.org/t/p/w220_and_h330_face' + props.poster} alt={props.title} />
    </div>
);

export default posterWrapper;
