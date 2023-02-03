import React from 'react';
import ErrorMsgStyle from '../css/error_message.module.css';

export const ErrorMsg = (props) => {
	return (
		<p className={ErrorMsgStyle.errorMsg}>{props.err}</p>
	)
}
