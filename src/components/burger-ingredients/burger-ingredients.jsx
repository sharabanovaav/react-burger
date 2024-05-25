import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './burger-ingredients.module.css'
import IngredientCard from './ingredient-card/ingredient-card'
import ingredientPropTypes from '../../consts/ingredient-prop-types.ts'
import useModal from '../../hooks/use-modal'
import Modal from '../modal/modal'
import IngredientDetails from './ingredient-details/ingredient-details'

const ingredientTypes = [
    {
        name: 'Булки',
        type: 'bun',
    },
    {
        name: 'Соусы',
        type: 'sauce',
    },
    {
        name: 'Начинки',
        type: 'main',
    },
]

export default function BurgerIngredients({ ingredients = [] }) {
    const [activeTabType, setActiveTabType] = useState(ingredientTypes[0].type)
    const [activeIngredient, setActiveIngredient] = useState(null)

    const { isModalOpen, openModal, closeModal } = useModal()

    const ingredientsDict = ingredients.reduce((dict, ingredient) => {
        if (!dict[ingredient.type]) {
            dict[ingredient.type] = []
        }

        dict[ingredient.type].push(ingredient)
        return dict
    }, {})

    const showIngredientDetails = (ingredient) => {
        setActiveIngredient(ingredient)
        openModal()
    }

    const handleModalClose = () => {
        setActiveIngredient(null)
        closeModal()
    }

    const renderModal = () => (
        <Modal title="Детали ингредиента" onClose={handleModalClose}>
            <IngredientDetails ingredient={activeIngredient} />
        </Modal>
    )

    const renderTypeTab = ({ type, name }) => (
        <Tab
            key={type}
            value={type}
            active={activeTabType === type}
            onClick={() => setActiveTabType(type)}
        >
            {name}
        </Tab>
    )

    const renderIngredients = ({ type, name }) => (
        <div key={`ingredient-${type}`}>
            <h2 className="text text_type_main-medium mb-6 mt-10">{name}</h2>

            <div className={`${styles.list} pl-4 pr-4`}>
                {ingredientsDict[type].map((ingredient, index) => (
                    <IngredientCard
                        key={ingredient._id}
                        ingredient={ingredient}
                        count={index % 5}
                        onClick={() => showIngredientDetails(ingredient)}
                    />
                ))}
            </div>
        </div>
    )

    return (
        <section>
            <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
            </h1>

            <div className={styles.tabs}>
                {ingredientTypes.map(renderTypeTab)}
            </div>

            {ingredients.length > 0 && (
                <div className={`${styles.ingredients} custom-scroll`}>
                    {ingredientTypes.map(renderIngredients)}
                </div>
            )}

            {isModalOpen && activeIngredient && renderModal()}
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes),
}
