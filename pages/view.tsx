import type {InferGetServerSidePropsType, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const url = context.query['url'] as string;
    // const content = await (await fetch(`http://localhost:3000/api/hello?url=${url}`)).text();
    return {
        props: {
            url,
            // content
        }
    }
}

const Viewer: NextPage = ({ url }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Highlighter Anywhere</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <iframe className={styles.content} src={`/api/hello?url=${url}`}/>
            <div className={styles.toolbox}>Highlight mode</div>
        </div>
    )
}

export default Viewer
