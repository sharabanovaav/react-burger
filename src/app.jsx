import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import styles from './app.module.css'

function App() {
    return (
        <div>
            <AppHeader />
            <div className={styles.content}>
                <BurgerIngredients className={styles.section} />
                <BurgerConstructor className={styles.section} />
            </div>
        </div>
    )
}

export default App
