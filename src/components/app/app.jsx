import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './app.module.css'
import { loadIngredients } from '../../services/ingredients/actions'

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIngredients())
    }, [])

    return (
        <div>
            <AppHeader />
            <main className={styles.main}>
                <BurgerIngredients className={styles.section} />
                <BurgerConstructor className={styles.section} />
            </main>
        </div>
    )
}
