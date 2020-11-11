import React from 'react';

import styles from './LanguageSwitcher.module.css';

import globeIcon from '../../assets/images/icon-globe.png';
import polishIcon from '../../assets/images/icon-polish.png';

const LanguageSwitcher = () => {
    return (
        <div className={styles.LanguageSwitcher} title="Change Language">
            <a href="?lang=en"><img className={styles.LangIcon} src={globeIcon} title="English" alt="EN" /></a>
            <a href="?lang=pl"><img className={styles.LangIcon} src={polishIcon} title="Polish" alt="PL" /></a>
        </div>
    );
}

export default LanguageSwitcher;