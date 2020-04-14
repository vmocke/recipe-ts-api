import React from 'react';
import classes from './Img.module.css';

interface ImgProps {
    classNameFig?: string | any;
    src: string | any;
    alt: string | any;
    className?: string | any;
    children?: any;
}

const Img = (props: ImgProps) => {
    return (
        <figure className={[classes[props.classNameFig]].join('.')}>
            <img src={props.src} alt={props.alt} className={[classes[props.className]].join('.')} />
            {props.children}
        </figure>
    );
};

export default Img;
