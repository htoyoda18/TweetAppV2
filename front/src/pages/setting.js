import React, { useEffect } from 'react';
import Sidebar from '../component/sidebar'
import { useNavigate } from "react-router-dom";

export const Setting = () => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate('/login');
			return;
		}
	}, [token, navigate]);
	return (
		<div>
			<Sidebar />
		</div>
	)
}
