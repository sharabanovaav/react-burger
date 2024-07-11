import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect , SyntheticEvent } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../utils/api'
import { getUser } from '../../services/user/reducer'
import { RESET_PASSWORD_LC_KEY } from '../../consts/local-storage-keys'
import { useForm } from '../../hooks/use-form'
import { TResetForm } from '../../types'

export function ResetPassword() {
    const user = useSelector(getUser)

    const { values, handleChange } = useForm<TResetForm>({
        token: '',
        password: '',
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem(RESET_PASSWORD_LC_KEY)) {
            navigate(user ? '/' : '/forgot-password')
        }
    }, [])

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()

        const { token, password } = values

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
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <Input
                        placeholder="Введите код из письма"
                        type="text"
                        value={values.token}
                        name="token"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-20">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={!values.token || !values.password}
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
