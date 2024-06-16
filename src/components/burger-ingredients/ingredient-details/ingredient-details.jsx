import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import styles from './ingredient-details.module.css'
import {
    getIngredients,
    getLoading,
} from '../../../services/ingredients/reducer'
import { loadIngredients } from '../../../services/ingredients/actions'

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
    const ingredients = useSelector(getIngredients)
    const loading = useSelector(getLoading)

    const dispatch = useDispatch()

    const { id } = useParams()

    const ingredientsMap = useMemo(
        () =>
            new Map(
                ingredients.map((ingredient) => [ingredient._id, ingredient])
            ),
        [ingredients]
    )

    const details = useMemo(() => ingredientsMap.get(id), [id, ingredientsMap])

    useEffect(() => {
        if (!ingredients.length && !loading) {
            dispatch(loadIngredients())
        }
    })

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

    const renderDetails = () => {
        if (loading) {
            return <h1 className="text text_type_main-medium">Загрузка...</h1>
        }

        if (!details) {
            return (
                <>
                    <h1 className="text text_type_main-medium mb-6">
                        Ингредиент с ID {id} не найден
                    </h1>
                    <Link className="link" to="/">
                        На главную
                    </Link>
                </>
            )
        }

        return (
            <>
                <img
                    className="mb-4"
                    src={details.image_large}
                    alt={`${details.name}.`}
                />
                <p className="text text_type_main-medium mb-8">
                    {details.name}
                </p>

                <div className={styles.nutritions}>
                    {nutritions.map(({ name, key }) =>
                        renderNutrition(name, details[key])
                    )}
                </div>
            </>
        )
    }

    return (
        <section className={`${styles.content} mt-20`}>
            {renderDetails()}
        </section>
    )
}
