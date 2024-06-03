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
import IngredientStub from '../ingredient-stub/ingredient-stub'

export default function IngredientsList() {
    const ingredients = useSelector(getIngredients)
    const bun = useSelector(getBun)
    const dispatch = useDispatch()

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
                <IngredientStub title="Выберите булки" type={type} />
            )}
        </div>
    )

    return (
        <div className={styles.wrapper}>
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
                    <IngredientStub title="Выберите начинку" />
                </div>
            )}

            {renderBun('bottom', 'низ')}
        </div>
    )
}
