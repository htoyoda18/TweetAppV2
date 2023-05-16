import React from 'react';
import ErrorMsgStyle from '../css/error_message.module.css';

export const ErrorMsg = ({err}) => {
	return (
		<p className={ErrorMsgStyle.errorMsg}>{err}</p>
	)
}
