import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Paginator.module.css';

const Paginator = (props) => {
    const { t } = useTranslation();

    let paginator = (
        <div className={styles.Paginator}>
            <button onClick={props.previous}>{t('previousPage')}</button>
            <span>[{props.current}/{props.total}]</span>
            <button onClick={props.next}>{t('nextPage')}</button>
        </div>
    );

    if(props.total <= 1)
    {
        paginator = (
            <div className={styles.Paginator}>
                <span>[{props.current}/{props.total}]</span>
            </div>
        );
    }

    return paginator;
}

export default Paginator;