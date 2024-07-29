import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { StatusesNames } from '../../consts'
import { getOrders as getAllOrders } from '../../services/all-orders/reducer'
import { getIngredients } from '../../services/ingredients/reducer'
import { getOrderByNumber } from '../../services/order/actions'
import { getOrder } from '../../services/order/reducer'
import { useDispatch, useSelector } from '../../services/store'
import { getOrders as getUserOrders } from '../../services/user-orders/reducer'
import { TIngredient } from '../../types'
import Price from '../price/price'
import styles from './order-info.module.css'

export function OrderInfo() {
    const { number: strNumber } = useParams()
    const dispatch = useDispatch()

    const allOrders = useSelector(getAllOrders)
    const userOrders = useSelector(getUserOrders)
    const loadedOrder = useSelector(getOrder)
    const allIngredients = useSelector(getIngredients)

    const number = useMemo(() => +(strNumber ?? 0), [strNumber])

    const order = useMemo(
        () =>
            allOrders.find(({ number: id }) => id === number) ||
            userOrders.find(({ number: id }) => id === number) ||
            loadedOrder,
        [allOrders, userOrders, loadedOrder, number]
    )

    const ingredientsMap = useMemo(
        () =>
            new Map(
                allIngredients.map((ingredient) => [ingredient._id, ingredient])
            ),
        [allIngredients]
    )

    const ingredients = useMemo(
        () =>
            (order?.ingredients ?? [])
                .map((ingredientId) => ingredientsMap.get(ingredientId))
                .filter(
                    (ingredient): ingredient is TIngredient =>
                        ingredient !== undefined
                ),
        [order, ingredientsMap]
    )

    const totalPrice = useMemo(
        () => ingredients.reduce((sum, { price }) => sum + price, 0),
        [ingredients]
    )

    const indredientsQuantities = useMemo(
        () =>
            ingredients.reduce(
                (res, { _id }) => {
                    res[_id] = res[_id] ? res[_id] + 1 : 1

                    return res
                },
                {} as Record<string, number>
            ),
        [ingredients]
    )

    useEffect(() => {
        if (!order) {
            dispatch(getOrderByNumber(number))
        }
    }, [number, order, dispatch])

    const renderIngredient = ({ _id, name, price, image }: TIngredient) => (
        <div key={_id} className={styles.ingredient}>
            <div className={`${styles.imageWrapper} mr-4`}>
                <img className={styles.image} src={image} alt={name} />
            </div>

            <div className="text text_type_main-default">{name}</div>

            <div className={styles.price}>
                <Price
                    price={`${indredientsQuantities[_id] ?? 0} x ${price}`}
                />
            </div>
        </div>
    )

    return (
        <main className={styles.order}>
            {order && (
                <>
                    <p
                        className={`text text_type_digits-default mb-10 ${styles.id}`}
                    >
                        #{order._id}
                    </p>
                    <h3 className="text text_type_main-medium mb-3">
                        {order.name}
                    </h3>
                    <p
                        className={`text text_type_main-default mb-15 ${styles[order.status]}`}
                    >
                        {StatusesNames[order.status]}
                    </p>
                    <h3 className="text text_type_main-medium mb-6">Состав:</h3>

                    <div
                        className={`${styles.ingredients} custom-scroll pr-6 mb-10`}
                    >
                        {[...new Set(ingredients)].map((ingredient) =>
                            renderIngredient(ingredient as TIngredient)
                        )}
                    </div>

                    <div className={styles.footer}>
                        <FormattedDate
                            className="text text_type_main-default text_color_inactive"
                            date={new Date(order.updatedAt)}
                        />
                        <Price price={totalPrice} />
                    </div>
                </>
            )}
        </main>
    )
}
