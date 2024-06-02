import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './burger-ingredients.module.css'
import IngredientCard from './ingredient-card/ingredient-card'
import useModal from '../../hooks/use-modal'
import Modal from '../modal/modal'
import IngredientDetails from './ingredient-details/ingredient-details'
import { loadIngredients } from '../../services/ingredients/actions'
import { getIngredients } from '../../services/ingredients/reducer'

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

export default function BurgerIngredients() {
    const ingredients = useSelector(getIngredients)
    const dispatch = useDispatch()

    const [activeTabType, setActiveTabType] = useState(ingredientTypes[0].type)
    const [activeIngredient, setActiveIngredient] = useState(null)

    const { isModalOpen, openModal, closeModal } = useModal()

    const tabsRef = useRef(null)
    const titlesRefs = useRef([])

    useEffect(() => {
        dispatch(loadIngredients())
    }, [])

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

    const scrollHandler = () => {
        const tabsBottom = tabsRef.current.getBoundingClientRect().bottom

        const diffs = titlesRefs.current.map((titleRef) => {
            const { top } = titleRef.getBoundingClientRect()

            return Math.abs(top - tabsBottom)
        })

        const activeIndex = diffs.indexOf(Math.min(...diffs))

        setActiveTabType(ingredientTypes[activeIndex].type)
    }

    const tabClickHandler = (type, index) => {
        setActiveTabType(type)
        titlesRefs.current[index].scrollIntoView({ behavior: 'smooth' })
    }

    const renderModal = () => (
        <Modal title="Детали ингредиента" onClose={handleModalClose}>
            <IngredientDetails ingredient={activeIngredient} />
        </Modal>
    )

    const renderTypeTab = ({ type, name }, index) => (
        <Tab
            key={type}
            value={type}
            active={activeTabType === type}
            onClick={() => tabClickHandler(type, index)}
        >
            {name}
        </Tab>
    )

    const renderIngredients = ({ type, name }, index) => (
        <div
            key={`ingredient-${type}`}
            ref={(el) => {
                titlesRefs.current[index] = el
            }}
        >
            <h2 className="text text_type_main-medium mb-6 mt-10">{name}</h2>

            <div className={`${styles.list} pl-4 pr-4`}>
                {ingredientsDict[type].map((ingredient) => (
                    <IngredientCard
                        key={ingredient._id}
                        ingredient={ingredient}
                        count={1}
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

            <div className={styles.tabs} ref={tabsRef}>
                {ingredientTypes.map((type, index) =>
                    renderTypeTab(type, index)
                )}
            </div>

            {ingredients.length > 0 && (
                <div
                    className={`${styles.ingredients} custom-scroll`}
                    onScroll={scrollHandler}
                >
                    {ingredientTypes.map(renderIngredients)}
                </div>
            )}

            {isModalOpen && activeIngredient && renderModal()}
        </section>
    )
}
