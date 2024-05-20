import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.css'

function AppHeader() {
    const renderNavigationLink = (icon, text, isActive = false) => (
        <a
            className={`${styles.link} ${isActive && styles.link_active} pl-5 pr-5 pb-4 pt-4`}
            href="/"
        >
            {icon}
            <span className="text text_type_main-default">{text}</span>
        </a>
    )
    return (
        <header className={`${styles.header} pb-4 pt-4`}>
            <div className={styles.header_content}>
                <div className={styles.links}>
                    {renderNavigationLink(
                        <BurgerIcon type="primary" />,
                        'Конструктор',
                        true
                    )}
                    {renderNavigationLink(
                        <ListIcon type="secondary" />,
                        'Лента заказов'
                    )}
                </div>

                <Logo />

                {renderNavigationLink(
                    <ProfileIcon type="secondary" />,
                    'Личный кабинет'
                )}
            </div>
        </header>
    )
}

export default AppHeader
