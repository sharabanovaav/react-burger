import { useDispatch } from 'react-redux'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import { logout } from '../../services/user/actions'

export function Profile() {
    const location = useLocation()
    const dispatch = useDispatch()
    const { pathname } = location

    const getCaption = () => {
        switch (pathname) {
            case '/profile':
                return 'изменить свои персональные данные'
            case '/profile/orders':
                return 'посмотреть свою историю заказов'
            default:
                return ''
        }
    }

    const getLinkClassName = (path) => {
        const activeClass = path === pathname ? '' : styles.link_inactive

        return `${styles.link} text text_type_main-medium pt-4 pb-4 ${activeClass}`
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <main className={`${styles.wrapper} mt-30`}>
            <section>
                <nav className={`${styles.nav} mb-20`}>
                    <NavLink
                        to="/profile"
                        className={() => getLinkClassName('/profile')}
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to="orders"
                        className={() => getLinkClassName('/profile/orders')}
                    >
                        История заказов
                    </NavLink>
                    <Button
                        className={`${styles.button} text text_type_main-medium text_color_inactive pt-4 pb-4`}
                        type="secondary"
                        onClick={() => handleLogout()}
                    >
                        Выход
                    </Button>
                </nav>

                <p
                    className={`${styles.caption} text text_type_main-default text_color_inactive`}
                >
                    В этом разделе вы можете
                </p>
                <p
                    className={`${styles.caption} text text_type_main-default text_color_inactive`}
                >
                    {getCaption()}
                </p>
            </section>

            <Outlet />
        </main>
    )
}
