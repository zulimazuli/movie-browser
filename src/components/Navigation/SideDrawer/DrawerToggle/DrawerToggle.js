import React from 'react';
import styles from './DrawerToggle.module.css';

const DrawerToggle = (props) => {

    const classes = props.opened ? [styles.DrawerToggle, styles.Active] : [styles.DrawerToggle]
    return (
    <div className={classes.join(' ')} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>);
}

export default DrawerToggle;