import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { StatusesNames } from '../../consts'
import { getIngredients } from '../../services/ingredients/reducer'
import { TIngredient, TOrder } from '../../types'
import Price from '../price/price'
import styles from './order-card.module.css'

const MAX_INGREDIENTS_LENGTH = 6

type TOrderCardProps = {
    order: TOrder
}

export function OrderCard({ order }: TOrderCardProps) {
    const allIngredients = useSelector(getIngredients)

    const ingredientsMap = useMemo(
        () =>
            new Map(
                allIngredients.map((ingredient) => [ingredient._id, ingredient])
            ),
        [allIngredients]
    )

    const ingredients = useMemo(
        () =>
            order.ingredients
                .map((id) => ingredientsMap.get(id))
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

    const displayedIngredients = useMemo(
        () => [...new Set(ingredients)].slice(0, MAX_INGREDIENTS_LENGTH),
        [ingredients]
    )

    const renderIngredients = () => (
        <div className={styles.ingredients}>
            {displayedIngredients.map(({ _id, image, name }, index) => (
                <div
                    key={_id}
                    className={styles.ingredient}
                    style={{ zIndex: displayedIngredients.length - index }}
                >
                    {index === MAX_INGREDIENTS_LENGTH - 1 && (
                        <div className={styles.counter}>
                            <span className="text text_type_main-medium">
                                +
                                {
                                    order.ingredients.slice(
                                        MAX_INGREDIENTS_LENGTH
                                    ).length
                                }
                            </span>
                        </div>
                    )}

                    <img className={styles.image} src={image} alt={name} />
                </div>
            ))}
        </div>
    )

    return (
        <div className={styles.card}>
            <div className={`${styles.header} mb-6`}>
                <span className="text text_type_digits-default">
                    #{order._id}
                </span>
                <FormattedDate
                    className="text text_type_main-default text_color_inactive"
                    date={new Date(order.updatedAt)}
                />
            </div>

            <h3 className="text text_type_main-medium">{order.name}</h3>

            <h6
                className={`mt-2 text text_type_main-default ${styles[order.status]}`}
            >
                {StatusesNames[order.status]}
            </h6>

            <div className={`${styles.details} mt-6`}>
                {renderIngredients()}
                <Price price={totalPrice} />
            </div>
        </div>
    )
}
