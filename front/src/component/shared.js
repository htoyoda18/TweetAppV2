import React from 'react';
import sharedStyle from '../css/shared.module.css';

export const Icon = (props) => {
    return (
        <a className={sharedStyle.userLink} href={"/user/" + props.userID}>
            <img className={sharedStyle.icon} src={props.image} />
        </a>
    )
}

export const LargeIcon = (props) => {
    return (
        <img className={sharedStyle.largeIcon} src={props.image} />
    )
}