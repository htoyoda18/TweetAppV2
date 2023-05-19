import '../css/global.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <link rel="icon" href={'./tab_icon.jpeg'} />
            </Head>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp;