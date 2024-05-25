import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import ingredientPropTypes from '../../../consts/ingredient-prop-types.ts'
import styles from './ingredient-card.module.css'

export default function IngredientCard({ ingredient, count = 0, onClick }) {
    return (
        <div className={styles.card} onClick={onClick}>
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
