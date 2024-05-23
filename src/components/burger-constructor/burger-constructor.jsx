import {
    CurrencyIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styles from './burger-constructor.module.css'
import IngredientsList from './ingredients-list/ingredients-list'
import ingredientPropTypes from '../../consts/ingredient-prop-types.ts'
import Modal from '../modal/modal'

export default function BurgerConstructor({ ingredients = [] }) {
    const [isModalOpen, setIsModalOpen] = useState()

    const bun = ingredients.find((ingredient) => ingredient.type === 'bun')

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const renderModal = () => (
        <Modal onClose={toggleModal}>
            <p>Спасибо за внимание!</p>
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
                    onClick={toggleModal}
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
