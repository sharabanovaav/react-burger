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
                const { data, success } = await res.json()

                if (success) {
                    setIngredients(data)
                }
            } catch (e) {
                console.log(e)
            }
        }

        getIngredients()
    }, [])

    return (
        <div>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients
                    className={styles.section}
                    ingredients={ingredients}
                />
                <BurgerConstructor
                    className={styles.section}
                    ingredients={ingredients}
                />
            </main>
        </div>
    )
}
