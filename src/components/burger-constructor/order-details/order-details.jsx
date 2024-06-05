import { useSelector } from 'react-redux'
import styles from './order-details.module.css'
import imageDone from '../../../images/done.png'
import { getOrderId, getLoading } from '../../../services/order/reducer'

export default function OrderDetails() {
    const orderId = useSelector(getOrderId)
    const isLoading = useSelector(getLoading)

    return (
        <section className={`${styles.content} mt-20`}>
            {isLoading ? (
                <p className="text text_type_main-medium">Загрузка...</p>
            ) : (
                <>
                    <p className="mb-32 text text_type_digits-large">
                        {orderId}
                    </p>
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
                </>
            )}
        </section>
    )
}
