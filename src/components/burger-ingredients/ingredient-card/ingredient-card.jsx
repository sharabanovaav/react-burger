import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import { useDrag } from 'react-dnd'
import ingredientPropTypes from '../../../consts/ingredient-prop-types.ts'
import styles from './ingredient-card.module.css'

export default function IngredientCard({ ingredient, count = 0, onClick }) {
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1,
        }),
    })

    return (
        <div
            className={styles.card}
            onClick={onClick}
            ref={dragRef}
            style={{ opacity }}
        >
            {count > 0 && (
                <Counter
                    className={styles.counter}
                    count={count}
                    size="default"
                />
            )}
            <img
                className={`${styles.image} ml-4 mr-4`}
                src={ingredient.image}
                alt={`${ingredient.name}.`}
            />
            <div className={styles.price}>
                <span className="text text_type_digits-default">
                    {ingredient.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default">
                {ingredient.name}
            </span>
        </div>
    )
}

IngredientCard.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func,
}
