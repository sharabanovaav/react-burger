import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { useDrag } from 'react-dnd'
import { TIngredient } from '../../../types'
import Price from '../../price/price'
import styles from './ingredient-card.module.css'

type TCollectedProps = {
    opacity: number
}

type TIngredientCardProps = {
    ingredient: TIngredient
    count: number
}

export default function IngredientCard({
    ingredient,
    count = 0,
}: TIngredientCardProps) {
    const [{ opacity }, dragRef] = useDrag<
        TIngredient,
        unknown,
        TCollectedProps
    >({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.3 : 1,
        }),
    })

    return (
        <div className={styles.card} ref={dragRef} style={{ opacity }}>
            {count > 0 && <Counter count={count} size="default" />}
            <img
                className={`${styles.image} ml-4 mr-4`}
                src={ingredient.image}
                alt={`${ingredient.name}.`}
            />
            <Price price={ingredient.price} />
            <span className="text text_type_main-default">
                {ingredient.name}
            </span>
        </div>
    )
}
