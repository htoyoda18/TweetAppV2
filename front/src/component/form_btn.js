import React from 'react';
import btnStyle from '../css/btn.module.css';

export const Formbtn = ({ name }) => {
	return (
		<button className={btnStyle.formbtn}>{name}</button>
	)
}
