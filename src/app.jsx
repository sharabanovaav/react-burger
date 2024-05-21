import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import styles from './app.module.css'

function App() {
    return (
        <div>
            <AppHeader />
            <div className={styles.content}>
                <BurgerIngredients />
            </div>
        </div>
    )
}

export default App
