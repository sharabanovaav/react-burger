import { Link, useLocation } from 'react-router-dom'
import { OrderCard } from '../../order-card/order-card'
import styles from './profile-orders.module.css'

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
        id: 2,
    },
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
        id: 3,
    },
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
        id: 4,
    },
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
        id: 5,
    },
]

export function ProfileOrders() {
    const location = useLocation()

    return (
        <section className={`${styles.orders} custom-scroll`}>
            {orders.map((order) => (
                <Link
                    style={{
                        color: 'inherit',
                        textDecoration: 'inherit',
                    }}
                    key={order.id}
                    to={`/profile/orders/${order.id}`}
                    state={{ backgroundLocation: location }}
                >
                    <OrderCard order={order} />
                </Link>
            ))}
        </section>
    )
}
