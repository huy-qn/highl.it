import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Index: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Highlighter Anywhere</title>
                <link rel="icon" href="/favicon.ico" />
                <script async defer data-domain="highl.it" src="https://analytics.huy.rocks/js/plausible.js"></script>
            </Head>

            <div className={styles.container}>
                Welcome!
            </div>
        </div>
    )
}

export default Index