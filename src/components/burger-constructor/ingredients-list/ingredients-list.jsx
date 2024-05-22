import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import ingredients from '../../../utils/ingredients.ts'
import styles from './ingredients-list.module.css'

const bun = ingredients.find((ingredient) => ingredient.type === 'bun')
const mains = ingredients.filter((ingredient) => ingredient.type !== 'bun')

export default function IngredientsList() {
    return (
        <div className={styles.wrapper}>
            <div className="ml-8">
                <ConstructorElement
                    type="top"
                    isLocked
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>

            <div className={`${styles.fillingWrapper} custom-scroll`}>
                {mains.map(({ name, image, price, _id }) => (
                    <div className={styles.filling}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            key={_id}
                            text={name}
                            price={price}
                            thumbnail={image}
                        />
                    </div>
                ))}
            </div>

            <div className="ml-8">
                <ConstructorElement
                    type="bottom"
                    isLocked
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
        </div>
    )
}
