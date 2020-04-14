import React from 'react';
import classes from './ItemPanel.module.css';
import Img from '../Img/Img';

interface ItemPanelProps {
    id: string;
    onClick?: any;
    onDoubleClick?: any;
    href: string;
    logo: string;
    alt: string;
    title: string;
    text: string;
}

const ItemPanel = (props: ItemPanelProps) => {
    const limitRecipeTitle = (title: any, limit = 17) => {
        const newTitle: any = [];
        if (title.length > limit) {
            title.split(' ').reduce((acc: any, cur: any) => {
                if (acc + cur.length <= limit) {
                    newTitle.push(cur);
                }

                return acc + cur.length;
            }, 0);

            return `${newTitle.join(' ')} ...`;
        }

        return title;
    };

    return (
        <li id={props.id} onClick={props.onClick} onDoubleClick={props.onDoubleClick}>
            <a className={classes.ItemPanel_link} href={props.href}>
                <Img classNameFig="likes__fig" src={props.logo} alt={props.alt} />
                <div className={classes.ItemPanel_data}>
                    <h4 className={classes.ItemPanel_name}>{limitRecipeTitle(props.title)}</h4>
                    <p className={classes.ItemPanel_author}>{props.text}</p>
                </div>
            </a>
        </li>
    );
};

export default ItemPanel;
