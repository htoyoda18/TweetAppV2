import React from 'react';
import btnStyle from '../css/btn.module.css';

type FormbtnProps = {
	name: string;
};

export const Formbtn: React.FC<FormbtnProps> = ({ name }) => {
	return (
		<button className={btnStyle.formbtn}>{name}</button>
	)
}