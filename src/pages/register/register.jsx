import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../../css/common-styles.css'

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <main className="page mt-30">
            <form onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

                <div className="mb-6">
                    <Input
                        placeholder="Имя"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

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
                        Зарегистрироваться
                    </Button>
                </div>

                <p className="text text_type_main-default text_color_inactive mb-4">
                    Уже зарегистрированы?{' '}
                    <Link className="link" to="/login">
                        Войти
                    </Link>
                </p>
            </form>
        </main>
    )
}
