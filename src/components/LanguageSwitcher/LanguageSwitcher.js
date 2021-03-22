import React from 'react';
import i18n from '../../i18n';

import styles from './LanguageSwitcher.module.css';

import globeIcon from '../../assets/images/icon-globe.png';
import polishIcon from '../../assets/images/icon-polish.png';

const LanguageSwitcher = () => {
    const handleSwitch = (lang) => {
        i18n.changeLanguage(lang)
        window.location.reload();
    }

    return (
        <div className={styles.LanguageSwitcher} title="Change Language">
            <img onClick={() => handleSwitch('en')} className={styles.LangIcon} src={globeIcon} title="English" alt="EN" />
            <img onClick={() => handleSwitch('pl')} className={styles.LangIcon} src={polishIcon} title="Polish" alt="PL" />
        </div>
    );
}

export default LanguageSwitcher;