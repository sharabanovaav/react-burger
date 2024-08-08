import { useParams, Link } from 'react-router-dom'
import { useMemo } from 'react'
import styles from './ingredient-details.module.css'
import {
    getIngredients,
    getLoading,
} from '../../../services/ingredients/reducer'
import Loader from '../../loader/loader'
import { TIngredient } from '../../../types'
import { useSelector } from '../../../services/store'

type TNutrition = {
    key: keyof Pick<
        TIngredient,
        'calories' | 'proteins' | 'fat' | 'carbohydrates'
    >
    name: string
}

const nutritions: TNutrition[] = [
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

    const { id } = useParams()

    const ingredientsMap = useMemo(
        () =>
            new Map(
                ingredients.map((ingredient) => [ingredient._id, ingredient])
            ),
        [ingredients]
    )

    const details = useMemo(
        () => ingredientsMap.get(id ?? ''),
        [id, ingredientsMap]
    )

    const renderNutrition = (name: string, value: number): JSX.Element => (
        <div key={name} className={styles.nutrition}>
            <span className="text text_type_main-default text_color_inactive">
                {name}
            </span>
            <span className="text text_type_digits-default text_color_inactive">
                {value}
            </span>
        </div>
    )

    const renderDetails = (): JSX.Element => {
        if (loading) {
            return <Loader />
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
