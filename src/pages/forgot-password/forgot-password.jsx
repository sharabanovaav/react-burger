import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../../css/common-styles.css'

export function ForgotPassword() {
    const [email, setEmail] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-20">
                    <Button htmlType="submit" type="primary" size="medium">
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
