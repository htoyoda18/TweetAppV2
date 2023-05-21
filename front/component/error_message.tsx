import React from 'react';
import ErrorMsgStyle from '../css/error_message.module.css';

type ErrorMsgProps = {
	err: string;
};

export const ErrorMsg: React.FC<ErrorMsgProps> = ({ err }) => {
	return (
		<p className={ErrorMsgStyle.errorMsg}>{err}</p>
	)
}