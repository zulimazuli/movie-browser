import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SearchBox from '../MovieResults/SearchBox/SearchBox';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

import styles from './Header.module.css';

const Header = () => {
    const { t } = useTranslation();

    return(
        <div className={styles.Header}>
            <div className={styles.Wrapper}>
                <div className={styles.MenuToggle}>
                {/* TODO Hamburger Menu */}
                </div>
                <div className={styles.Logo}>
                    <h1><Link className={styles.Title} to="/">{t('title')}</Link></h1>
                </div>
                <SearchBox />
                {/* <LanguageSwitcher /> */}
            </div>
        </div>
    );
}

export default Header;