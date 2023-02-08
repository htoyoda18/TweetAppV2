import React from 'react';
import sharedStyle from '../css/shared.module.css';

export const Icon = (props) => {
    return (
        <a className={sharedStyle.userLink} href={"/user/" + props.userID}>
            <img className={sharedStyle.icon} src={props.image} />
        </a>
    )
}