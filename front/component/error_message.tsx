import React from 'react';
import ErrorMsgStyle from '../css/error_message.module.css';

type ErrorMsgProps = {
	err: string;
};

export const ErrorMsg = ({ err }: ErrorMsgProps) => {
	return (
		<p className={ErrorMsgStyle.errorMsg}>{err}</p>
	)
}