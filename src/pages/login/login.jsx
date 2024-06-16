import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import styles from './login.module.css'
import '../../css/common-styles.css'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordShown, setIsPasswordShown] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <main className={`${styles.main} mt-30`}>
            <form onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium mb-6">Вход</h1>

                <div className="mb-6">
                    <Input
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <Input
                        placeholder="Пароль"
                        type={isPasswordShown ? 'text' : 'password'}
                        value={password}
                        icon={isPasswordShown ? 'HideIcon' : 'ShowIcon'}
                        onIconClick={() => setIsPasswordShown(!isPasswordShown)}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-20">
                    <Button htmlType="submit" type="primary" size="medium">
                        Войти
                    </Button>
                </div>

                <p className="text text_type_main-default text_color_inactive mb-4">
                    Вы — новый пользователь?{' '}
                    <Link className="link" to="/register">
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?{' '}
                    <Link className="link" to="/forgot-password">
                        Восстановить пароль
                    </Link>
                </p>
            </form>
        </main>
    )
}
