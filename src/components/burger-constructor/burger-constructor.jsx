import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import styles from './burger-constructor.module.css'
import IngredientsList from './ingredients-list/ingredients-list'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import useModal from '../../hooks/use-modal'
import {
    getIngredients,
    getBun,
} from '../../services/burger-constructor/reducer'

export default function BurgerConstructor() {
    const ingredients = useSelector(getIngredients)
    const bun = useSelector(getBun)

    const { isModalOpen, openModal, closeModal } = useModal()

    const renderModal = () => (
        <Modal onClose={closeModal}>
            <OrderDetails />
        </Modal>
    )

    return (
        <section className="p-25 pl-4 pr-4">
            <IngredientsList ingredients={ingredients} bun={bun} />

            <div className={`${styles.footer} mt-10`}>
                <div className={styles.price}>
                    <span className="text text_type_digits-medium">610</span>
                    <CurrencyIcon type="primary" />
                </div>

                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={openModal}
                >
                    Оформить заказ
                </Button>
            </div>

            {isModalOpen && renderModal()}
        </section>
    )
}
