import { Link, useLocation } from 'react-router-dom'
import { FeedStatistics } from '../../components/feed-statistics/feed-statistics'
import { OrderCard } from '../../components/order-card/order-card'
import styles from './feed.module.css'

const orders = [
    {
        ingredients: [
            {
                _id: '643d69a5c3f7b9001cfa093c',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
            },
            {
                _id: '643d69a5c3f7b9001cfa0941',
                name: 'Биокотлета из марсианской Магнолии',
                type: 'main',
                proteins: 420,
                fat: 142,
                carbohydrates: 242,
                calories: 4242,
                price: 424,
                image: 'https://code.s3.yandex.net/react/code/meat-01.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/meat-01-large.png',
                __v: 0,
            },
        ],
        id: 1,
    },
]

export function Feed() {
    const location = useLocation()

    return (
        <main className={`${styles.wrapper} mt-10`}>
            <h1 className="text text_type_main-large mb-6">Лента заказов</h1>

            <div className={styles.content}>
                <section className={`${styles.orders} custom-scroll`}>
                    {orders.map((order) => (
                        <Link
                            style={{
                                color: 'inherit',
                                textDecoration: 'inherit',
                            }}
                            key={order.id}
                            to={`/feed/${order.id}`}
                            state={{ backgroundLocation: location }}
                        >
                            <OrderCard order={order} />
                        </Link>
                    ))}
                </section>

                <FeedStatistics />
            </div>
        </main>
    )
}
