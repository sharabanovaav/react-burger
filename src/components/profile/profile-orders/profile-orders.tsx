import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { OrderCard } from '../../order-card/order-card'
import styles from './profile-orders.module.css'
import { useDispatch, useSelector } from '../../../services/store'
import { getOrders } from '../../../services/user-orders/reducer'
import {
    userOrdersWsConnect,
    userOrdersWsDisconnect,
} from '../../../services/user-orders/actions'
import { ACCESS_TOKEN_LC_KEY } from '../../../consts/local-storage-keys'

const WS_URL = 'wss://norma.nomoreparties.space/orders'

export function ProfileOrders() {
    const dispatch = useDispatch()
    const orders = useSelector(getOrders)

    const location = useLocation()

    const connect = () => {
        const accessToken = localStorage
            .getItem(ACCESS_TOKEN_LC_KEY)
            ?.toString()
            .replace('Bearer ', '')

        dispatch(userOrdersWsConnect(`${WS_URL}?token=${accessToken}`))
    }

    const disconnect = () => dispatch(userOrdersWsDisconnect())

    useEffect(() => {
        connect()

        return () => {
            disconnect()
        }
    }, [])

    return (
        <section className={`${styles.orders} custom-scroll`}>
            {orders.map((order) => (
                <Link
                    style={{
                        color: 'inherit',
                        textDecoration: 'inherit',
                    }}
                    key={order.number}
                    to={`/profile/orders/${order.number}`}
                    state={{ backgroundLocation: location }}
                >
                    <OrderCard order={order} />
                </Link>
            ))}
        </section>
    )
}
