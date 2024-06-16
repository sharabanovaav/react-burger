import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './burger-ingredients.module.css'
import IngredientCard from './ingredient-card/ingredient-card'
import Modal from '../modal/modal'
import IngredientDetails from './ingredient-details/ingredient-details'
import { loadIngredients } from '../../services/ingredients/actions'
import { getIngredients } from '../../services/ingredients/reducer'
import {
    getBun,
    getIngredients as getConstructorIngredients,
} from '../../services/burger-constructor/reducer'
import { BUNS_QUANTITY } from '../../consts/index.ts'
import {
    getDetails,
    deleteDetails,
    setDetails,
} from '../../services/ingredient-details/reducer'

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
    const ingredientDetails = useSelector(getDetails)

    const constructorIngredients = useSelector(getConstructorIngredients)
    const bun = useSelector(getBun)

    const dispatch = useDispatch()

    const [activeTabType, setActiveTabType] = useState(ingredientTypes[0].type)

    const tabsRef = useRef(null)
    const titlesRefs = useRef([])

    useEffect(() => {
        dispatch(loadIngredients())
    }, [dispatch])

    const ingredientsCountDict = useMemo(() => {
        const countsDict = {}

        if (bun) {
            countsDict[bun._id] = BUNS_QUANTITY
        }

        return constructorIngredients.reduce((dict, ingredient) => {
            dict[ingredient._id] = dict[ingredient._id]
                ? dict[ingredient._id] + 1
                : 1
            return dict
        }, countsDict)
    }, [bun, constructorIngredients])

    const ingredientsDict = useMemo(
        () =>
            ingredients.reduce((dict, ingredient) => {
                if (!dict[ingredient.type]) {
                    dict[ingredient.type] = []
                }

                dict[ingredient.type].push(ingredient)
                return dict
            }, {}),
        [ingredients]
    )

    const showIngredientDetails = (ingredient) => {
        dispatch(setDetails(ingredient))
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
        <Modal
            title="Детали ингредиента"
            onClose={() => dispatch(deleteDetails())}
        >
            <IngredientDetails ingredient={ingredientDetails} />
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
                        count={ingredientsCountDict[ingredient._id]}
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

            {ingredientDetails && renderModal()}
        </section>
    )
}
