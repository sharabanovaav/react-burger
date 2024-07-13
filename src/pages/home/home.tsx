import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import styles from './home.module.css'

export function Home() {
    return (
        <main className={styles.main}>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.section}>
                    <BurgerIngredients  />
                </div>
                <div className={styles.section}>
                    <BurgerConstructor  />
                </div>
            </DndProvider>
        </main>
    )
}
