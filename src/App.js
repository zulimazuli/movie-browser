import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import MovieBrowser from './containers/Browser/MovieBrowser';
import Movie from './containers/Movie/Movie';

const App = () => {
  return (
    <BrowserRouter basename="/movie-browser" >
      <div className="App">
          <LanguageSwitcher />       
          <Switch>
            <Route path="/movie/:id" component={Movie} />
            <Route path="/" component={MovieBrowser} />
          </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
