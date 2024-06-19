import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../utils/api'
import { getUser } from '../../services/user/reducer'
import { RESET_PASSWORD_LC_KEY } from '../../consts/local-storage-keys.ts'

export function ResetPassword() {
    const user = useSelector(getUser)
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem(RESET_PASSWORD_LC_KEY)) {
            navigate(user ? '/' : '/forgot-password')
        }

        return localStorage.removeItem(RESET_PASSWORD_LC_KEY)
    })

    async function handleSubmit(event) {
        event.preventDefault()
        await api.resetPassword({ token, password })
        navigate('/login')
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
