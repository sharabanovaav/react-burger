import { useEffect, useState } from 'react'
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import styles from './app.module.css'

export default function App() {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const res = await fetch(url)
                const { data } = await res.json()

                setIngredients([...ingredients, ...data])
            } catch (e) {
                console.log(e)
            }
        }

        getIngredients()
    }, [])

    return (
        <div>
            <AppHeader />
            <div className={styles.content}>
                <BurgerIngredients
                    className={styles.section}
                    ingredients={ingredients}
                />
                <BurgerConstructor
                    className={styles.section}
                    ingredients={ingredients}
                />
            </div>
        </div>
    )
}
