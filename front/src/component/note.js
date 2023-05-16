import React from 'react';
import NoteStyle from '../css/note.module.css';

export const Note = ({text, url, link}) => {
	return (
		<div className={NoteStyle.note}>{text} <a href={url}>{link}</a></div>
	)
}
