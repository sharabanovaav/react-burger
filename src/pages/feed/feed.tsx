import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FeedStatistics } from '../../components/feed-statistics/feed-statistics'
import { OrderCard } from '../../components/order-card/order-card'
import {
    allOrdersWsConnect,
    allOrdersWsDisconnect,
} from '../../services/all-orders/actions'
import {
    getOrders,
    getTotal,
    getTotalToday,
} from '../../services/all-orders/reducer'
import { useDispatch, useSelector } from '../../services/store'
import styles from './feed.module.css'

const WS_URL = 'wss://norma.nomoreparties.space/orders/all'

export function Feed() {
    const dispatch = useDispatch()
    const orders = useSelector(getOrders)
    const total = useSelector(getTotal)
    const totalToday = useSelector(getTotalToday)

    const location = useLocation()

    const connect = () => dispatch(allOrdersWsConnect(WS_URL))
    const disconnect = () => dispatch(allOrdersWsDisconnect())

    useEffect(() => {
        connect()

        return () => {
            disconnect()
        }
    }, [])

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
                            key={order._id}
                            to={`/feed/${order.number}`}
                            state={{ backgroundLocation: location }}
                        >
                            <OrderCard order={order} />
                        </Link>
                    ))}
                </section>

                <section className={`${styles.statistics} custom-scroll`}>
                    <FeedStatistics
                        orders={orders}
                        total={total ?? 0}
                        totalToday={totalToday ?? 0}
                    />
                </section>
            </div>
        </main>
    )
}
