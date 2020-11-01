import React from 'react';
import styles from './ActionButton.module.css';

const actionButton = (props) => {
    const classes = [styles.Button, styles[props.function]];
    return <button className={classes.join(' ')} onClick={props.action}>{props.label}</button>;
}

export default actionButton;