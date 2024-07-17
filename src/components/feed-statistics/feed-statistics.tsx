import styles from './feed-statistics.module.css'

export function FeedStatistics() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <section>
            <div className={`${styles.orders} mb-15`}>
                <div>
                    <h2 className="text text_type_main-medium mb-6">Готовы:</h2>

                    <ul className={styles.list}>
                        {nums.map((num) => (
                            <li
                                className={`text text_type_digits-default ${styles.ready}`}
                            >
                                {num}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text text_type_main-medium mb-6">
                        В работе:
                    </h2>
                    <ul className={styles.list}>
                        {nums.map((num) => (
                            <li className="text text_type_digits-default">
                                {num}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <h2 className="text text_type_main-medium">
                Выполнено за все время:
            </h2>
            <p className="text text_type_digits-large mb-15">28 752</p>

            <h2 className="text text_type_main-medium">
                Выполнено за сегодня:
            </h2>
            <p className="text text_type_digits-large">138</p>
        </section>
    )
}
