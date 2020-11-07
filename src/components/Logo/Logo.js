import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './Logo.module.css';

const Logo = () => {
    const { t } = useTranslation();
    return (
  <div className={styles.Logo}>
    <h1>
      <Link className={styles.Title} to="/">
        {t('title')}
      </Link>
    </h1>
  </div>
);
}

export default Logo;
