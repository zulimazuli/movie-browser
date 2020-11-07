import React from 'react';

const style = {
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    zIndex: '99'
}

const Backdrop = (props) => (
    props.show ? <div style={style} onClick={props.clicked}></div> : null
);

export default Backdrop;