import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../types'
import Price from '../price/price'
import styles from './order-info.module.css'

const ingredients = [
    {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
    },
    {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
    },
]

export function OrderInfo() {
    const renderIngredient = ({ _id, name, price, image }: TIngredient) => (
        <div key={_id} className={styles.ingredient}>
            <div className={`${styles.imageWrapper} mr-4`}>
                <img className={styles.image} src={image} alt={name} />
            </div>

            <div className="text text_type_main-default">{name}</div>

            <div className={styles.price}>
                <Price price={`2 x ${price}`} />
            </div>
        </div>
    )
    return (
        <main className={styles.order}>
            <p className={`text text_type_digits-default mb-10 ${styles.id}`}>
                #12345
            </p>
            <h3 className="text text_type_main-medium mb-3">name</h3>
            <p
                className={`text text_type_main-default ${true && styles.ready} mb-15`}
            >
                State
            </p>
            <h3 className="text text_type_main-medium mb-6">Состав:</h3>

            <div className={`${styles.ingredients} custom-scroll pr-6 mb-10`}>
                {ingredients.map((ingredient) =>
                    renderIngredient(ingredient as TIngredient)
                )}
            </div>

            <div className={styles.footer}>
                <FormattedDate
                    className="text text_type_main-default text_color_inactive"
                    date={new Date('2022-10-10T17:33:32.877Z')}
                />
                <Price price={510} />
            </div>
        </main>
    )
}
