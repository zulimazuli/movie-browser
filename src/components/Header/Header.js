import React, { useState } from 'react';
import SearchBox from '../MovieList/SearchBox/SearchBox';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

import styles from './Header.module.css';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Logo from '../Logo/Logo';

const Header = (props) => {
    const [showSideDrawer, SetShowSideDrawer] = useState(false);

    return(
        <div className={styles.Header}>
            <div className={styles.Wrapper}>
                <Logo />
                <DrawerToggle clicked={() => SetShowSideDrawer(!showSideDrawer)} opened={showSideDrawer}/>
                <div className={styles.Navigation}>
                    <LanguageSwitcher />
                    <SearchBox />
                </div>

            </div>
            <SideDrawer show={showSideDrawer} close={() => SetShowSideDrawer(false)} />

        </div>
    );
}

export default Header;