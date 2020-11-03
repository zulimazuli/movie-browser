import React, { lazy } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './MovieBrowser.module.css';
import BrowserNavigation from '../../components/BrowserNavigation/BrowserNavigation';
import SearchBox from '../../components/MovieResults/SearchBox/SearchBox';

const MovieList = lazy(() => import('../../components/MovieResults/MovieList'))

const TRENDING_MOVIES = 'trending';
const DISCOVER_MOVIES = 'discover';
 
const MovieBrowser = (props) => {  
    const { t } = useTranslation();

    const renderContent = (type, props) => {        
        return <MovieList type={type} {...props} />;
    }

    return (
        <React.Fragment>
            <div className={styles.Header}>
                <h1><Link className={styles.Title} to="/">{t('title')}</Link></h1>
                <BrowserNavigation />
                <SearchBox />
            </div>            
            <Switch>
                <Route path={'/' + TRENDING_MOVIES} render={(props) => renderContent(TRENDING_MOVIES, props)} />       
                <Route path={'/' + DISCOVER_MOVIES} render={(props) => renderContent(DISCOVER_MOVIES, props)} />
                <Route path="/search" component={MovieList} /> 
                <Redirect from="/" to={'/' + TRENDING_MOVIES} />
            </Switch>
                
        </React.Fragment>
    )
}

export default React.memo(MovieBrowser);