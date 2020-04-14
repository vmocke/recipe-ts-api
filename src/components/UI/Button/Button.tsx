import React from 'react';
import classes from './Button.module.css';

interface ButtonProps {
    classNameDiv?: any | string;
    classNameButton: string;
    onClick?: any;
    children?: any;
}

const Button = (props: ButtonProps) => {
    return (
        <div className={[classes[props.classNameDiv]].join('.')}>
            <button className={[classes[props.classNameButton]].join('.')} onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    );
};

export default Button;
