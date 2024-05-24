import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import styles from './ingredients-list.module.css'
import ingredientPropTypes from '../../../consts/ingredient-prop-types.ts'

export default function IngredientsList({ bun, ingredients = [] }) {
    return (
        <div className={styles.wrapper}>
            {bun && (
                <div className="ml-8">
                    <ConstructorElement
                        type="top"
                        isLocked
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}

            {ingredients.length > 0 && (
                <div className={`${styles.fillings} custom-scroll`}>
                    {ingredients.map(({ name, image, price, _id }) => (
                        <div className={styles.filling} key={_id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={name}
                                price={price}
                                thumbnail={image}
                            />
                        </div>
                    ))}
                </div>
            )}

            {bun && (
                <div className="ml-8">
                    <ConstructorElement
                        type="bottom"
                        isLocked
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}
        </div>
    )
}

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
    bun: ingredientPropTypes,
}
