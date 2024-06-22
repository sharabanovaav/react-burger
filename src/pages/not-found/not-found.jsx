import { Link } from 'react-router-dom'
import styles from './not-found.module.css'

export function NotFound() {
    return (
        <div className={`${styles.wrapper} mt-20`}>
            <h1 className="text text_type_digits-large">404</h1>
            <p className="text text_type_main-medium">Страницы не существует</p>
            <p className="text text_type_main-default">
                проверьте адрес или перейдите на{' '}
                <Link to="/" className="link">
                    главную
                </Link>
            </p>
        </div>
    )
}
