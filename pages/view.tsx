import type {InferGetServerSidePropsType, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'
import Script from "next/script";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const url = context.query['url'] as string;
    const reader = context.query['reader'] as string ?? 'false';
    return {
        props: {
            url,
            reader
        }
    }
}

const Viewer: NextPage = ({ url, reader }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Highlighter Anywhere</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <iframe className={styles.content} src={`/api/hello?url=${url}&reader=${reader}`}/>
            <div className={styles.toolbox}>
                <a href={url}>← Back to original page</a>
                <div className={styles.flexSeparator}/>
                <a href={'#'}>Share ▵</a>
                <span className={styles.separator}/>
                <a href={'#'}>Go to library →</a>
            </div>

            <Script data-domain="highl.it" src="https://analytics.huy.rocks/js/plausible.js"></Script>
        </div>
    )
}

export default Viewer
