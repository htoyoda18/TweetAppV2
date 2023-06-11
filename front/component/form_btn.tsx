import React from 'react';
import btnStyle from '../styles/btn.module.css';

type FormbtnProps = {
	name: string;
};

export const Formbtn: React.FC<FormbtnProps> = ({ name }) => {
	return (
		<button className={btnStyle.formbtn}>{name}</button>
	)
}