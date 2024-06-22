import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { login } from '../../services/user/actions'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    function handleSubmit(event) {
        event.preventDefault()

        dispatch(
            login({
                email,
                password,
            })
        )
    }

    return (
        <main className="page mt-30">
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
                    <PasswordInput
                        placeholder="Пароль"
                        value={password}
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
