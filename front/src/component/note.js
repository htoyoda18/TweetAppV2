import React from 'react';
import NoteStyle from '../css/note.module.css';

export const Note = (props) => {
	return (
		<div className={NoteStyle.note}>{props.text} <a href={props.url}>{props.link}</a></div>
	)
}
