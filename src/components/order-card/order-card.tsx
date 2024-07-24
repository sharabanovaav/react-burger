import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from '../price/price'
import styles from './order-card.module.css'

const MAX_INGREDIENTS_LENGTH = 6

type TOrderCardProps = {
    order: {
        ingredients: any[] // TODO:
    }
}

export function OrderCard({ order }: TOrderCardProps) {
    const renderIngredients = () => {
        const displayedIngredients = order.ingredients.slice(
            0,
            MAX_INGREDIENTS_LENGTH
        )

        return (
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
    }

    return (
        <div className={styles.card}>
            <div className={`${styles.header} mb-6`}>
                <span className="text text_type_digits-default">#12345</span>
                <FormattedDate
                    className="text text_type_main-default text_color_inactive"
                    date={new Date('2022-10-10T17:33:32.877Z')}
                />
            </div>

            <h3 className="text text_type_main-medium">name</h3>

            <h6
                className={`mt-2 text text_type_main-default ${true && styles.ready}`}
            >
                State
            </h6>

            <div className={`${styles.details} mt-6`}>
                {renderIngredients()}
                <Price price={100} />
            </div>
        </div>
    )
}
