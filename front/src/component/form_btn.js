import React from 'react';
import btnStyle from '../css/btn.module.css';

export const Formbtn = (props) => {
	return (
		<button className={btnStyle.formbtn}>{props.name}</button>
	)
}
