import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, withRouter } from 'react-router-dom';
import Input from '../../UI/Input/Input';

import styles from './SearchBox.module.css';

import searchIcon from '../../../assets/images/search-icon.png';

const SearchBox = (props) => {
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const history = useHistory();

  const setTheQueryFromSearch = () => {
    console.log('[search] useEffect');
    const q = new URLSearchParams(props.location.search).get('q');
    if (q !== query) {
      setQuery(q ?? '');
      console.log('[search] query', q);
    }
  };

  useEffect(setTheQueryFromSearch, []);

  const searchSubmitHandler = () => {
    if(query) {
      history.push({
        pathname: '/search',
        search: '?q=' + query,
      });
      if(props.callback) {
        props.callback();
      }
    }
  };

  const inputChangedHandler = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.Search}>
      <Input
        type="search"
        name="search"
        placeholder={t('searchPlaceholder')}
        onEnter={searchSubmitHandler}
        changed={(event) => inputChangedHandler(event)}
        value={query}
      />
      <div className={styles.Submit} onClick={searchSubmitHandler}><img src={searchIcon} alt="search" /></div>
    </div>
  );
};

export default withRouter(SearchBox);
