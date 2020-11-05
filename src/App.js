import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import MovieBrowser from './containers/Browser/MovieBrowser';
import Movie from './containers/Movie/Movie';

const App = () => {
  return (
    <BrowserRouter basename="/movie-browser" >
      <div className="App">
          <Header />
          <div className="content">
            <Switch>
              <Route path="/movie/:id" component={Movie} />
              <Route path="/" component={MovieBrowser} />
            </Switch>
          </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
