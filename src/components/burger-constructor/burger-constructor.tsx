import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '../../services/store'
import styles from './burger-constructor.module.css'
import IngredientsList from './ingredients-list/ingredients-list'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import { useModal } from '../../hooks/use-modal'
import {
    getTotalPrice,
    getIngredients,
    getBun,
    reset as resetConstructor,
} from '../../services/burger-constructor/reducer'
import { createOrder } from '../../services/order/actions'
import { reset } from '../../services/order/reducer'
import { getUser } from '../../services/user/reducer'

export default function BurgerConstructor() {
    const user = useSelector(getUser)
    const totalPrice = useSelector(getTotalPrice)
    const bun = useSelector(getBun)
    const ingredients = useSelector(getIngredients)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isModalOpen, openModal, closeModal } = useModal()

    const orderRequest = useMemo(() => {
        const bunId = bun?._id ?? ''
        const ingredientsIds = ingredients.map(({ _id }) => `${_id}`)

        return [bunId, ...ingredientsIds, bunId]
    }, [bun, ingredients])

    const submitOrder = (): void => {
        if (!user) {
            navigate('/login')
        } else {
            dispatch(createOrder(orderRequest))
            openModal()
        }
    }

    const closeModalHandler = (): void => {
        closeModal()
        dispatch(reset())
        dispatch(resetConstructor())
    }

    const renderModal = (): JSX.Element => (
        <Modal onClose={closeModalHandler}>
            <OrderDetails />
        </Modal>
    )

    return (
        <section className="p-25 pl-4 pr-4">
            <IngredientsList />

            <div className={`${styles.footer} mt-10`}>
                <div className={styles.price}>
                    <span className="text text_type_digits-medium">
                        {totalPrice}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>

                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    disabled={!bun || !ingredients.length}
                    onClick={submitOrder}
                >
                    Оформить заказ
                </Button>
            </div>

            {isModalOpen && renderModal()}
        </section>
    )
}
