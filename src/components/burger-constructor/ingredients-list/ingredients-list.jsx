import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import styles from './ingredients-list.module.css'
import {
    deleteIngredient,
    getIngredients,
    getBun,
} from '../../../services/burger-constructor/reducer'

export default function IngredientsList() {
    const ingredients = useSelector(getIngredients)
    const bun = useSelector(getBun)
    const dispatch = useDispatch()

    const deleteHandler = (customId) => {
        dispatch(deleteIngredient(customId))
    }

    return (
        <div className={styles.wrapper}>
            {bun && (
                <div className="ml-8">
                    <ConstructorElement
                        type="top"
                        isLocked
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}

            {ingredients.length > 0 && (
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
            )}

            {bun && (
                <div className="ml-8">
                    <ConstructorElement
                        type="bottom"
                        isLocked
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}
        </div>
    )
}
