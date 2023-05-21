import React from 'react';
import NoteStyle from '../css/note.module.css';

type ErrorMsgProps = {
	text: string;
	url: string;
	link: string;
};

export const Note: React.FC<ErrorMsgProps> = ({ text, url, link }) => {
	return (
		<div className={NoteStyle.note}>{text} <a href={url}>{link}</a></div>
	)
}