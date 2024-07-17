import { FeedStatistics } from '../../components/feed-statistics/feed-statistics'
import styles from './feed.module.css'

export function Feed() {
    return (
        <main className={`${styles.wrapper} mt-10`}>
            <h1 className="text text_type_main-large mb-6">Лента заказов</h1>

            <div className={styles.content}>
                <section>TODO:</section>
                <FeedStatistics />
            </div>
        </main>
    )
}
