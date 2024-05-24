import styles from './ingredient-details.module.css'
import ingredientPropTypes from '../../../consts/ingredient-prop-types.ts'

const nutritions = [
    {
        key: 'calories',
        name: 'Калории,ккал',
    },
    {
        key: 'proteins',
        name: 'Белки, г',
    },
    {
        key: 'fat',
        name: 'Жиры, г',
    },
    {
        key: 'carbohydrates',
        name: 'Углеводы, г',
    },
]

export default function IngredientDetails({ ingredient }) {
    const renderNutrition = (name, value) => (
        <div key={name} className={styles.nutrition}>
            <span className="text text_type_main-default text_color_inactive">
                {name}
            </span>
            <span className="text text_type_digits-default text_color_inactive">
                {value}
            </span>
        </div>
    )
    return (
        <section className={`${styles.content} mt-20`}>
            <img
                className="mb-4"
                src={ingredient.image_large}
                alt="Ингредиент"
            />
            <p className="text text_type_main-medium mb-8">{ingredient.name}</p>

            <div className={styles.nutritions}>
                {nutritions.map(({ name, key }) =>
                    renderNutrition(name, ingredient[key])
                )}
            </div>
        </section>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
}
