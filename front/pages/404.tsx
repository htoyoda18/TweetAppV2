import { NextPage } from "next";
import { useState, useEffect } from 'react';
import Sidebar from '../component/sidebar';
import NotFoundStyle from '../css/not_found.module.css';
import { client } from '../libs/axios'
import { GetToken } from '../shared/localStorage'
import { useRouter } from 'next/router';

const NotFound: NextPage = () => {
    const token = GetToken();
    const router = useRouter();    
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        const fetchCatImage = async () => {
            try {
                const res = await client.get('https://api.thecatapi.com/v1/images/search');
                if (res.data) {
                    const images = res.data;
                    setImageUrl(images[0].url);
                }
            } catch (err) {
                console.log("err", err);
            }
        };

        if (!token) {
            router.push('/login');
            return;
        }

        fetchCatImage();
    }, [token]);

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

export default NotFound;