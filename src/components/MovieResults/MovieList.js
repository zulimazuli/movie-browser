import tmdb from '../../axios-tmdb';
import React, { Component } from 'react';
import MovieResult from './MovieResult/MovieResult';
import styles from './MovieList.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Paginator from './Paginator/Paginator';

class MovieList extends Component {
  state = {
    movies: null,
    genres: null,
    apiSearchTypes: [
    { name: 'trending', url: '/trending/movie/week' },
    { name: 'discover', url: '/discover/movie?primary_release_year=2020&sort_by=primary_release_date.desc&vote_count.gte=50' }],
    cacheEnabled: false,
    apiSearchCache: [],
    pageSize: 20,
    currentPage: 1,
    totalPages: 1,
    loading: false
  };

  componentDidMount() {
    this.loadData();
    this.loadGenres();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.type !== this.props.type || prevState.currentPage !== this.state.currentPage) {
        this.loadData();
    }
  } 

  loadData = () => {
    this.setState({loading: true});

    const currentApi = this.props.type;

    const apiUrl = this.state.apiSearchTypes.find(el => el.name === currentApi).url;

    if(this.state.cacheEnabled && this.state.apiSearchCache.findIndex(el => el.name === currentApi) > -1) {
      console.log('list from cache');
      const content = this.state.apiSearchCache.find(el => el.name === currentApi).content
      this.setState({movies: content, loading: false});

    } else {
      console.log('list from API');
      this.setState({loading: true});      
      tmdb.get(apiUrl, { params: { page: this.state.currentPage}})
        .then((res) => {
          this.setState({ 
            movies: res.data.results, 
            currentPage: res.data.page, 
            totalPages: res.data.total_pages });

          const cache = [...this.state.apiSearchCache];
          cache.push({name: currentApi, content: res.data.results});
          this.setState({apiSearchCache: cache, loading: false});
        })
        .catch((err) => console.log(err));
    }
  }

  loadGenres = () => {
    if(!this.state.genres) {
      tmdb.get('/genre/movie/list').then(res => {
        this.setState({ genres: res.data.genres });
      });
    }
  }

  movieClickedHandler = (movieId) => {
    this.props.history.push("/movie/" + movieId);
  }

  nextPageHandler = () =>
  {
    if(this.state.currentPage < this.state.totalPages) {
      this.setState(prevState => ({currentPage: prevState.currentPage + 1}))
    }
  }

  previousPageHandler = () =>
  {
    if(this.state.currentPage > 1) {
      this.setState(prevState => ({currentPage: prevState.currentPage - 1}))
    }
  }
 

  render() {
    let movies = null;

    if (this.state.movies && this.state.genres) {
      movies = this.state.movies.map((movie) => {
        return <div className={styles.Wrapper} key={movie.id} onClick={() => this.movieClickedHandler(movie.id)}>
            <MovieResult movie={movie} genres={this.state.genres} />
          </div>;
      });
    }

    let moviesContainer = (
      <React.Fragment>
        <div className={styles.MovieList}>
          {movies}
        </div>
        <Paginator current={this.state.currentPage} total={this.state.totalPages} next={this.nextPageHandler} previous={this.previousPageHandler} />
      </React.Fragment>
      );

    if(this.state.loading) {
      moviesContainer = <Spinner />
    }
    return (moviesContainer);
  }
}

export default MovieList;
