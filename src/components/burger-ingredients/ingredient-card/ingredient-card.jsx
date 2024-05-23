import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import ingredientPropTypes from '../../../consts/ingredient-prop-types.ts'
import styles from './ingredient-card.module.css'

export default function IngredientCard({ ingredient, count = 0 }) {
    const [isModalOpen, setIsModalOpen] = useState()

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const renderModal = () => (
        <Modal title="Детали ингредиента" onClose={toggleModal}>
            <IngredientDetails ingredient={ingredient} />
        </Modal>
    )

    return (
        <div
            className={styles.card}
            onClick={toggleModal}
            onKeyDown={toggleModal}
        >
            {count > 0 && (
                <Counter
                    className={styles.counter}
                    count={count}
                    size="default"
                />
            )}
            <img
                className={`${styles.image} ml-4 mr-4`}
                src={ingredient.image}
                alt="Ингредиент"
            />
            <div className={styles.price}>
                <span className="text text_type_digits-default">
                    {ingredient.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default">
                {ingredient.name}
            </span>

            {isModalOpen && renderModal()}
        </div>
    )
}

IngredientCard.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    count: PropTypes.number,
}
