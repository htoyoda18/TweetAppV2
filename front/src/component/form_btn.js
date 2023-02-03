import React from 'react';
import btnStyle from '../css/btn.css';

export const Formbtn = (props) => {
	return (
		<button className={btnStyle}>{props.name}</button>
	)
}
