import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {

    const enterKeyPressedHandler = (event) => {
        if (event.key === 'Enter' && props.onEnter) {
            props.onEnter();
          }
    }

    return (
        <input 
        className={styles.Input} 
        type={props.type} 
        name={props.name} 
        placeholder={props.placeholder}
        onChange={props.changed}
        onKeyDown={enterKeyPressedHandler} 
        value={props.value} />
    );
}

export default Input;