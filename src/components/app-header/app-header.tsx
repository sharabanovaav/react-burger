import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { TIconTypes } from '../../types'
import styles from './app-header.module.css'

type TNavItem = {
    icon: (type: TIconTypes) => JSX.Element,
    title: string,
    url: string,
}

const navItems: Record<string, TNavItem> = {
    home: {
        icon: (type) => <BurgerIcon type={type} />,
        title: 'Конструктор',
        url: '/',
    },
    feed: {
        icon: (type) => <ListIcon type={type} />,
        title: 'Лента заказов',
        url: '/feed',
    },
    profile: {
        icon: (type) => <ProfileIcon type={type} />,
        title: 'Личный кабинет',
        url: '/profile',
    },
}

export default function AppHeader() {
    const renderNavigationItem = ({ icon, title, url }: TNavItem): JSX.Element => {
        const classes = `${styles.link} pl-5 pr-5 pb-4 pt-4`

        return (
            <NavLink
                to={url}
                className={({ isActive }) =>
                    isActive ? `${styles.link_active} ${classes}` : classes
                }
            >
                {({ isActive }) => (
                    <>
                        {icon(isActive ? 'primary' : 'secondary')}
                        <span className="text text_type_main-default">
                            {title}
                        </span>
                    </>
                )}
            </NavLink>
        )
    }

    return (
        <header className={`${styles.header} pb-4 pt-4`}>
            <nav className={styles.navigation}>
                <div className={styles.links}>
                    {renderNavigationItem(navItems.home)}
                    {renderNavigationItem(navItems.feed)}
                </div>

                <NavLink to="/">
                    <Logo />
                </NavLink>

                {renderNavigationItem(navItems.profile)}
            </nav>
        </header>
    )
}
