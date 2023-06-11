import { NextPage } from "next";
import { useState, useEffect } from 'react';
import Sidebar from '../../component/sidebar';
import NotFoundStyle from '../../styles/not_found.module.css';
import { publicClient } from '../../api/client/axios'
import { GetToken } from '../../shared/localStorage'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { url } from '../../shared/url'

const NotFound: NextPage = () => {
    const token = GetToken();
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchCatImage = async () => {
            try {
                const res = await publicClient.get(url.RundomCat);
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
            <Head>
                <title>ページが見つかりませんでした</title>
            </Head>
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