import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { useState } from 'react'
import styles from './ingredients-list.module.css'
import {
    deleteIngredient,
    getIngredients,
    getBun,
    setBun,
    addIngredient,
} from '../../../services/burger-constructor/reducer'
import IngredientStub from '../ingredient-stub/ingredient-stub'
import { BUN_TYPE, INGREDIENT_TYPE } from '../../../consts/index.ts'

export default function IngredientsList() {
    const ingredients = useSelector(getIngredients)
    const bun = useSelector(getBun)
    const dispatch = useDispatch()

    const [hoveredType, setHoveredType] = useState('')

    // eslint-disable-next-line no-unused-vars
    const [_, dropTarget] = useDrop({
        accept: 'ingredient',
        hover(ingredient) {
            setHoveredType(
                ingredient.type === BUN_TYPE ? BUN_TYPE : INGREDIENT_TYPE
            )
        },
        drop(ingredient) {
            setHoveredType('')
            if (ingredient.type === BUN_TYPE) {
                dispatch(setBun(ingredient))
            } else {
                dispatch(addIngredient(ingredient))
            }
        },
    })

    const deleteHandler = (customId) => {
        dispatch(deleteIngredient(customId))
    }

    const renderBun = (type, comment) => (
        <div className="ml-8">
            {bun ? (
                <ConstructorElement
                    type={type}
                    isLocked
                    text={`${bun.name} (${comment})`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            ) : (
                <IngredientStub
                    title="Выберите булки"
                    type={type}
                    hovered={hoveredType === BUN_TYPE}
                />
            )}
        </div>
    )

    return (
        <div className={styles.wrapper} ref={dropTarget}>
            {renderBun('top', 'верх')}

            {ingredients.length > 0 ? (
                <div className={`${styles.fillings} custom-scroll`}>
                    {ingredients.map(({ name, image, price, customId }) => (
                        <div className={styles.filling} key={customId}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={name}
                                price={price}
                                thumbnail={image}
                                handleClose={() => deleteHandler(customId)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="ml-8">
                    <IngredientStub
                        title="Выберите начинку"
                        hovered={hoveredType === INGREDIENT_TYPE}
                    />
                </div>
            )}

            {renderBun('bottom', 'низ')}
        </div>
    )
}
