import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom'
import { SyntheticEvent } from 'react'
import { api } from '../../utils/api'
import { useForm } from '../../hooks/use-form'
import { TUserForm } from '../../types'

export function ForgotPassword() {
    const { values, handleChange } = useForm<Pick<TUserForm, 'email'>>({
        email: '',
    })

    const navigate = useNavigate()

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        await api.getResetToken(values.email)
        navigate('/reset-password')
    }

    return (
        <main className="page mt-30">
            <form onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium mb-6">
                    Восстановление пароля
                </h1>

                <div className="mb-6">
                    <Input
                        placeholder="Укажите e-mail"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-20">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        disabled={!values.email}
                    >
                        Восстановить
                    </Button>
                </div>

                <p className="text text_type_main-default text_color_inactive mb-4">
                    Вспомнили пароль?{' '}
                    <Link className="link" to="/login">
                        Войти
                    </Link>
                </p>
            </form>
        </main>
    )
}
