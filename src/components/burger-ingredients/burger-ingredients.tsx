import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useRef, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './burger-ingredients.module.css'
import IngredientCard from './ingredient-card/ingredient-card'
import { getIngredients } from '../../services/ingredients/reducer'
import {
    getBun,
    getIngredients as getConstructorIngredients,
} from '../../services/burger-constructor/reducer'
import { BUNS_QUANTITY } from '../../consts'
import { TIngredient, TIngredientType } from '../../types'
import { useSelector } from '../../services/store'

type TIndredientTab = {
    name: string
    type: TIngredientType
}

const ingredientTabs: TIndredientTab[] = [
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
    const constructorIngredients = useSelector(getConstructorIngredients)
    const bun = useSelector(getBun)

    const [activeTabType, setActiveTabType] = useState<TIngredientType>(
        ingredientTabs[0].type
    )

    const tabsRef = useRef<HTMLDivElement | null>(null)
    const titlesRefs = useRef<HTMLDivElement[]>([])

    const location = useLocation()

    const ingredientsCountDict = useMemo(() => {
        const countsDict: Record<string, number> = {}

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
            ingredients.reduce(
                (dict, ingredient) => {
                    dict[ingredient.type] ??= []

                    dict[ingredient.type].push(ingredient)
                    return dict
                },
                {} as Record<TIngredientType, TIngredient[]>
            ),
        [ingredients]
    )

    const scrollHandler = (): void => {
        const tabsBottom = tabsRef.current?.getBoundingClientRect().bottom ?? 0

        const diffs = titlesRefs.current.map((titleRef) => {
            const { top } = titleRef.getBoundingClientRect()

            return Math.abs(top - tabsBottom)
        })

        const activeIndex = diffs.indexOf(Math.min(...diffs))

        setActiveTabType(ingredientTabs[activeIndex].type)
    }

    const tabClickHandler = (type: TIngredientType, index: number): void => {
        setActiveTabType(type)
        titlesRefs.current[index].scrollIntoView({ behavior: 'smooth' })
    }

    const renderTypeTab = (
        { type, name }: TIndredientTab,
        index: number
    ): JSX.Element => (
        <Tab
            key={type}
            value={type}
            active={activeTabType === type}
            onClick={() => tabClickHandler(type, index)}
        >
            {name}
        </Tab>
    )

    const renderIngredients = (
        { type, name }: TIndredientTab,
        index: number
    ): JSX.Element => (
        <div
            key={`ingredient-${type}`}
            ref={(el) => {
                if (el) titlesRefs.current[index] = el
            }}
        >
            <h2 className="text text_type_main-medium mb-6 mt-10">{name}</h2>

            <div className={`${styles.list} pl-4 pr-4`}>
                {ingredientsDict[type].map((ingredient) => (
                    <div key={ingredient._id} data-testid="ingredient-link">
                        <Link
                            style={{
                                color: 'inherit',
                                textDecoration: 'inherit',
                            }}
                            to={`/ingredients/${ingredient._id}`}
                            state={{ backgroundLocation: location }}
                        >
                            <IngredientCard
                                ingredient={ingredient}
                                count={ingredientsCountDict[ingredient._id]}
                            />
                        </Link>
                    </div>
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
                {ingredientTabs.map((type, index) =>
                    renderTypeTab(type, index)
                )}
            </div>

            {ingredients.length > 0 && (
                <div
                    className={`${styles.ingredients} custom-scroll`}
                    onScroll={scrollHandler}
                >
                    {ingredientTabs.map(renderIngredients)}
                </div>
            )}
        </section>
    )
}
