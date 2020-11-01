import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './BrowserNavigation.module.css';

const TRENDING_MOVIES = 'trending';
const DISCOVER_MOVIES = 'discover';

const BrowserNavigation = () => {
    const { t } = useTranslation();

    return (
        <nav className={styles.Navigation}>
            <ul>
                <li><NavLink to={'/' + TRENDING_MOVIES} activeClassName={styles.Active}>{t('lists.trending')}</NavLink></li>
                <li>|</li>
                <li><NavLink to={'/' + DISCOVER_MOVIES} activeClassName={styles.Active}>{t('lists.discover')}</NavLink></li>
            </ul>           
        </nav>
    );
}

export default BrowserNavigation;