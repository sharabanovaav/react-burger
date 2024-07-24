import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './price.module.css'

type TPriceProps = {
    price: number | string
}

export default function Price({ price }: TPriceProps) {
    return (
        <div className={styles.price}>
            <span className="text text_type_digits-default">{price}</span>
            <CurrencyIcon type="primary" />
        </div>
    )
}
