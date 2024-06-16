import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../../css/common-styles.css'

export function ResetPassword() {
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

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
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                <div className="mb-20">
                    <Button htmlType="submit" type="primary" size="medium">
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
