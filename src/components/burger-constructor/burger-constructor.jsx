import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import styles from './burger-constructor.module.css'
import IngredientsList from './ingredients-list/ingredients-list'
import ingredientPropTypes from '../../consts/ingredient-prop-types.ts'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import useModal from '../../hooks/use-modal'

export default function BurgerConstructor({ ingredients = [] }) {
    const { isModalOpen, openModal, closeModal } = useModal()

    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')

    const selectedIngredients = ingredients.filter(
        (ingredient) => ingredient.type !== 'bun'
    )

    const renderModal = () => (
        <Modal onClose={closeModal}>
            <OrderDetails />
        </Modal>
    )

    return (
        <section className="p-25 pl-4 pr-4">
            <IngredientsList ingredients={selectedIngredients} bun={bun} />

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

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
}
