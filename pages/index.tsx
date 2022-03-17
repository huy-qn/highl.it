import type {NextPage} from 'next'
import Script from 'next/script'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Index: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Highlighter Anywhere</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.container}>
                Welcome!
            </div>

            <Script data-domain="highl.it" src="https://analytics.huy.rocks/js/plausible.js"></Script>
        </div>
    )
}

export default Index
