import React, { Component } from 'react';
import tmdb from '../../axios-tmdb';
import Spinner from '../../components/UI/Spinner/Spinner';

import styles from './Movie.module.css';
import { withTranslation } from 'react-i18next';
import Providers from '../../components/Movie/Providers/Providers';
import Videos from '../../components/Movie/Videos/Videos';

class Movie extends Component {
    state ={
        id: null,
        movie: null,
        loading: true,
        error: false,
        imgLoaded: false
    }

    componentDidMount () {
        const movieId = this.props.match.params.id;
        tmdb.get('/movie/' + movieId + '?append_to_response=videos')
            .then(res => {
                this.setState({
                    id: this.props.match.params.id,
                    movie: res.data, 
                    loading: false
                });
                console.log('[Movie Data]', res.data)
            })
            .catch(err => this.setState({id: this.props.match.params.id, loading: false, error: true}))
    }

    goBackHandler = () => {
        if(this.props.history) {
            this.props.history.goBack();
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        const { t } = this.props;
        let movie = null;
        if (this.state.movie) {
            const backdropPosterPath = this.state.movie.backdrop_path ? 'http://image.tmdb.org/t/p/w1280/' + this.state.movie.backdrop_path : null;
            const gradientBackground = 'linear-gradient(90deg, rgba(51,51,51,1) 20%, rgba(30,30,30,0.8) 100%)';
            const posterPath = this.state.movie.poster_path ? 'http://image.tmdb.org/t/p/w300_and_h450_bestv2' + this.state.movie.poster_path : 'https://images-we-got-pop.imgix.net/website/marketing/movie-placeholder.png?w=300&h=450&fit=clamp&auto=format,compress';
            const poster = <img src={posterPath} alt="" />
            const navigation = <div className={styles.Navigation}><button onClick={this.goBackHandler}>{t('backToBrowser')}</button></div>;

            movie = (
                <React.Fragment>
                {navigation}
                <div className={styles.Movie} style={{backgroundImage: [gradientBackground, `url(${backdropPosterPath})`].join(',')}}>
                    <div className={styles.Wrapper}>
                        <div className={styles.Poster}>{poster}</div>
                        <div className={styles.Title}>
                            <h1>{this.state.movie.title}</h1>
                            {this.state.movie.title !== this.state.movie.original_title && <span>{this.state.movie.original_title}</span>}
                        </div>                    
                        <div className={styles.Details}>
                            <div className={styles.DetailsWrapper}>                       
                                <ul className={styles.Informations}>
                                    <li>{this.state.movie.release_date}</li>
                                    <li>{this.state.movie.production_countries.map(country => country.iso_3166_1).join('/')}</li>
                                    <li>{this.state.movie.runtime} {t('minutes')}</li>
                                </ul>
                                <div className={styles.Genres}>{this.state.movie.genres.map(genre => genre.name).join(', ')}</div>
                            </div> 
                            <div className={styles.Overview}>
                                <p>{this.state.movie.overview}</p>
                            </div>
                            <div className={styles.Ratings}>
                                <span className={styles.Badge}>{this.state.movie.vote_average.toFixed(1)}<small>/10</small></span>
                            </div>
                        </div>                    
                        <div className={styles.Providers}>
                            <Providers title={this.state.movie.original_title} />
                        </div>
                    </div>

                </div>
                    <div className={styles.Videos}>
                        <Videos videos={this.state.movie.videos.results} />
                    </div>

            </React.Fragment>
            );
        }
        if(this.state.loading && !this.state.imgLoaded) {
            movie = <Spinner />
        }
        if(this.state.error) {
            movie = <div>Error occured.</div>
        }
        return (movie);
    }
}

export default withTranslation()(Movie);