import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Paginator.module.css';

const Paginator = (props) => {
    const { t } = useTranslation();
    return (
        <div className={styles.Paginator}>
            <button onClick={props.previous}>{t('previousPage')}</button>
            <span>[{props.current}/{props.total}]</span>
            <button onClick={props.next}>{t('nextPage')}</button>
        </div>
    );
}

export default Paginator;