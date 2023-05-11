import React, { useState, useEffect } from 'react';
import Sidebar from '../component/sidebar';
import { useNavigate } from 'react-router-dom';
import NotFoundStyle from '../css/not_found.module.css';
import { client } from '../libs/axios'

export const NotFound = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchCatImage = async () => {
            try {
                const res = await client.get('https://api.thecatapi.com/v1/images/search');
                if (res.data) {
                    const images = res.data;
                    setImageUrl(images[0].url);
                    console.log('imageUrl', images[0].url);
                }
            } catch (err) {
                console.log("err", err.response);
            }
        };

        if (!token) {
            navigate('/login');
            return;
        }

        fetchCatImage();
    }, [token, navigate]);

    return (
        <div className={NotFoundStyle.notFound}>
            <Sidebar />
            <div className={NotFoundStyle.notFoundDescription}>
                <h1>404 Not Found</h1>
                <p>お探しのページは見つかりませんでした</p>
                <img className={NotFoundStyle.notFoundCatImage} src={imageUrl} alt="Cat" />
            </div>
        </div>
    );
}