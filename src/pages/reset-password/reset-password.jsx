import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../../utils/api'

export function ResetPassword() {
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const { success } = await api.resetPassword({ token, password })

        if (success) {
            navigate('/login')
        }
    }

    return (
        <main className="page mt-30">
            <form onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium mb-6">
                    Восстановление пароля
                </h1>

                <div className="mb-6">
                    <PasswordInput
                        placeholder="Введите новый пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <Input
                        placeholder="Введите код из письма"
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>

                <div className="mb-20">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={!token || !password}
                    >
                        Сохранить
                    </Button>
                </div>

                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?{' '}
                    <Link className="link" to="/login">
                        Войти
                    </Link>
                </p>
            </form>
        </main>
    )
}
