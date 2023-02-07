import React from 'react';
import sharedStyle from '../css/shared.module.css';

export const Icon = (props) => {
    return (
        <img className={sharedStyle.icon} src={props.image}></img>
    )
}