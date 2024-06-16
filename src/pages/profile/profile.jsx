import { Outlet, NavLink, useLocation } from 'react-router-dom'
import styles from './profile.module.css'

export function Profile() {
    const location = useLocation()
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
                    <NavLink to="/" className={() => getLinkClassName('/')}>
                        Выход
                    </NavLink>
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
