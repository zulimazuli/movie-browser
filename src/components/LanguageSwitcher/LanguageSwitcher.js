import React from 'react';

import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
    return (
        <div className={styles.LanguageSwitcher}>
            <a href="?lang=pl"><div>PL</div></a>
            <a href="?lang=en"><div>EN</div></a>
        </div>
    );
}

export default LanguageSwitcher;