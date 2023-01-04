import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Olgun Yolçınar&apos;s Desktop</title>
        <meta name='description' content='Web Developer based in Istanbul.' />
        <meta
          name='Keywords'
          content='Web Development, Next.js, React, Front-End, Back-End, Olgun Yolçınar '
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
