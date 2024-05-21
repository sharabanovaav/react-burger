import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import styles from './ingredient-card.module.css'

function IngredientCard({ ingredient, count }) {
    return (
        <div className={styles.card}>
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
                alt="Ингредиент"
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

const ingredientPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
})

IngredientCard.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    count: PropTypes.number,
}

export default IngredientCard
