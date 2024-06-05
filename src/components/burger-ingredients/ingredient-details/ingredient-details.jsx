import { useSelector } from 'react-redux'
import styles from './ingredient-details.module.css'
import { getDetails } from '../../../services/ingredient-details/reducer'

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

export default function IngredientDetails() {
    const details = useSelector(getDetails)

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
                src={details.image_large}
                alt={`${details.name}.`}
            />
            <p className="text text_type_main-medium mb-8">{details.name}</p>

            <div className={styles.nutritions}>
                {nutritions.map(({ name, key }) =>
                    renderNutrition(name, details[key])
                )}
            </div>
        </section>
    )
}
