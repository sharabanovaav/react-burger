import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from '../../../services/store'
import styles from './ingredients-list.module.css'
import {
    deleteIngredient,
    getIngredients,
    getBun,
    setBun,
    addIngredient,
    setIngredients,
} from '../../../services/burger-constructor/reducer'
import IngredientStub from '../ingredient-stub/ingredient-stub'
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient'
import { TIngredient, TIngredientType } from '../../../types'

export default function IngredientsList() {
    const ingredients = useSelector(getIngredients)
    const bun = useSelector(getBun)
    const dispatch = useDispatch()

    const [hoveredType, setHoveredType] = useState<TIngredientType | ''>('')

    const [, dropTarget] = useDrop<TIngredient, unknown, unknown>({
        accept: 'ingredient',
        hover(ingredient) {
            setHoveredType(ingredient.type)
        },
        drop(ingredient) {
            setHoveredType('')
            if (ingredient.type === 'bun') {
                dispatch(setBun(ingredient))
            } else {
                dispatch(
                    addIngredient({
                        ...ingredient,
                        customId: nanoid(),
                    })
                )
            }
        },
    })

    const deleteHandler = (customId: string): void => {
        dispatch(deleteIngredient(customId))
    }

    const moveHandler = (fromIndex: number, toIndex: number): void => {
        const dragCard = ingredients[fromIndex]
        const newIngredients = [...ingredients]

        newIngredients.splice(fromIndex, 1)
        newIngredients.splice(toIndex, 0, dragCard)

        dispatch(setIngredients(newIngredients))
    }

    const renderBun = (
        type: 'top' | 'bottom',
        comment: string
    ): JSX.Element => (
        <div className="ml-8">
            {bun ? (
                <div data-testid="constructor-ingredient-bun">
                    <ConstructorElement
                        type={type}
                        isLocked
                        text={`${bun.name} (${comment})`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            ) : (
                <IngredientStub
                    title="Выберите булки"
                    type={type}
                    hovered={hoveredType === 'bun'}
                />
            )}
        </div>
    )

    return (
        <div
            className={styles.wrapper}
            ref={dropTarget}
            data-testid="ingredient-drop-target"
        >
            {renderBun('top', 'верх')}

            {ingredients.length > 0 ? (
                <div className={`${styles.fillings} custom-scroll`}>
                    {ingredients.map((ingredient, index) => (
                        <div
                            key={ingredient.customId}
                            data-testid="constructor-ingredient"
                        >
                            <DraggableIngredient
                                index={index}
                                ingredient={ingredient}
                                onDelete={deleteHandler}
                                onMove={moveHandler}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="ml-8">
                    <IngredientStub
                        title="Выберите начинку"
                        hovered={
                            hoveredType === 'main' || hoveredType === 'sauce'
                        }
                    />
                </div>
            )}

            {renderBun('bottom', 'низ')}
        </div>
    )
}
