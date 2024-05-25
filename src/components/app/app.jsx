import { useEffect, useState } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './app.module.css'

export default function App() {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const res = await fetch(url)

                if (!res.ok) {
                    throw new Error(`Ошибка ${res.status}`)
                }

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
