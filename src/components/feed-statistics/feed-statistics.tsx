import { useMemo } from 'react'
import { TOrder } from '../../types'
import styles from './feed-statistics.module.css'

type TFeedStatisticsProps = {
    orders: TOrder[]
    total: number
    totalToday: number
}

export function FeedStatistics({
    orders,
    total,
    totalToday,
}: TFeedStatisticsProps) {
    const DISPLAYED_QUANTITY = 10

    const readyIds = useMemo(
        () =>
            orders
                .filter(({ status }) => status === 'done')
                .map(({ _id }) => _id)
                .slice(0, DISPLAYED_QUANTITY),
        [orders]
    )

    const notReadyIds = useMemo(
        () =>
            orders
                .filter(({ status }) => status !== 'done')
                .map(({ _id }) => _id)
                .slice(0, DISPLAYED_QUANTITY),
        [orders]
    )

    return (
        <section>
            <div>
                <h2 className="text text_type_main-medium mb-6">Готовы:</h2>

                <ul className="mb-15">
                    {readyIds.map((num) => (
                        <li
                            key={num}
                            className={`text text_type_digits-default ${styles.ready}`}
                        >
                            {num}
                        </li>
                    ))}
                    {readyIds.length === 0 && '—'}
                </ul>
            </div>

            <div>
                <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                <ul className="mb-15">
                    {notReadyIds.map((num) => (
                        <li key={num} className="text text_type_digits-default">
                            {num}
                        </li>
                    ))}
                    {notReadyIds.length === 0 && '—'}
                </ul>
            </div>

            <h2 className="text text_type_main-medium">
                Выполнено за все время:
            </h2>
            <p className="text text_type_digits-large mb-15">{total}</p>

            <h2 className="text text_type_main-medium">
                Выполнено за сегодня:
            </h2>
            <p className="text text_type_digits-large">{totalToday}</p>
        </section>
    )
}
