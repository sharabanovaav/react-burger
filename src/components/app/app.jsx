import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './app.module.css'

export default function App() {
    return (
        <div>
            <AppHeader />
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients className={styles.section} />
                    <BurgerConstructor className={styles.section} />
                </DndProvider>
            </main>
        </div>
    )
}
