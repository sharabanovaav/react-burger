import styles from './order-details.module.css'
import imageDone from '../../../images/done.png'

export default function OrderDetails() {
    return (
        <div className={`${styles.content} mt-20`}>
            <p className="mb-32 text text_type_digits-large">034536</p>
            <p className="text text_type_main-medium mb-15">
                идентификатор заказа
            </p>
            <img className="mb-15" src={imageDone} alt="Готово" />
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mb-15">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}
