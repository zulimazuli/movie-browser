import tmdb from '../../axios-tmdb';
import React, { Component } from 'react';
import MovieResult from './MovieResult/MovieResult';
import styles from './MovieList.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Paginator from './Paginator/Paginator';

class MovieList extends Component {
  state = {
    searchedQuery: null,
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
    console.log('[MovieList] did mount')

    if(this.props.match.path.includes('search'))
    {
      console.log('[MovieList] this is search')
      this.searchTitle();
    } else {

      this.loadData();
    }
    this.loadGenres();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('[MovieList] did update')
    const query = new URLSearchParams(this.props.location.search).get('q');
    if(prevProps !== this.props || prevState.currentPage !== this.state.currentPage) {
      console.log('[MovieList] update: props changed', this.props)
      if(query) {
        console.log('[MovieList] there is query', query)

        this.searchTitle();

      } else {

        this.loadData();
      }
    }
  } 
  
  searchTitle = () => {
    const query = new URLSearchParams(this.props.location.search).get('q');

    if(query && this.state.searchedQuery !== this.props.searchedQuery) {
        
      this.setState({searchedQuery: query, loading: true});

      tmdb.get('/search/movie?query=' + query) // todo: paging - { params: { page: this.state.currentPage}
        .then(res => {
          this.setState({ 
            movies: res.data.results, 
            currentPage: res.data.page, 
            totalPages: res.data.total_pages });

          const cache = [...this.state.apiSearchCache];
          cache.push({name: query, content: res.data.results});
          this.setState({apiSearchCache: cache, loading: false});
        });
    }
  }

  loadData = () => {
    const currentApi = this.props.type;
    if(!currentApi) {
      return;
    }

    this.setState({loading: true});
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

  movieClickedHandler = (movieId, movieName) => {
    const normalizedName = movieName
      .replace(/[^a-zA-Z \p{L}]/g, '')
      // .replace(/\s+/g, '-')
      .replace(/\W/g, '-')
      .substring(0, 50)
      .toLowerCase();
      
    this.props.history.push('/movie/' + movieId + '/' + normalizedName);
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
        return <div className={styles.Wrapper} key={movie.id} onClick={() => this.movieClickedHandler(movie.id, movie.title)}>
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
