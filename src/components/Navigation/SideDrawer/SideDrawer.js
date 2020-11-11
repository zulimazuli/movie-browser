import React from 'react';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import SearchBox from '../../MovieList/SearchBox/SearchBox';
import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {
  let classes = props.show ? styles.Open : styles.Close;
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={[styles.SideDrawer, classes].join(' ')}>
        <LanguageSwitcher  />
        <SearchBox callback={props.close} />        
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
