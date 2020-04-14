import React from 'react';
import classes from './Backdrop.module.css';

interface BackdropProps {
    show: any;
    backdropClicked: () => void;
}

const Backdrop = (props: BackdropProps) => {
    return props.show ? <div className={classes.Backdrop} onClick={props.backdropClicked}></div> : null;
};

export default Backdrop;
