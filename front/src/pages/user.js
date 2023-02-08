import React from 'react'
import Sidebar from '../component/sidebar'
import { UserInfo } from '../component/user_info'
import TweetStyle from '../css/tweet.module.css';
import { client } from '../libs/axios'
import { useState } from 'react';
import { useParams } from "react-router-dom";

export const User = () => {
    const token = localStorage.getItem('token')
    const [user, setUser] = useState({});
    const params = useParams();
    window.onload = function () {
		UserGet()
	}
    const UserGet = () => {
        const url = 'v1/user/' + params.id
		client
			.get(url, { headers: { Authorization: token } })
			.then((res) => {
				setUser(res.data)
			})
			.catch((err) => {
				console.log("err", err.response)
			})
	}
    return (
        <div className={TweetStyle.Tweet}>
            <Sidebar />
            <UserInfo userName={user.name}/>
        </div>
    )
}
