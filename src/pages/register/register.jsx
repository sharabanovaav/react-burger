import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../services/user/actions'
import { useForm } from '../../hooks/use-form'

export function Register() {
    const { values, handleChange } = useForm({
        name: '',
        email: '',
        password: '',
    })

    const dispatch = useDispatch()

    function handleSubmit(event) {
        event.preventDefault()

        const { email, name, password } = values

        dispatch(
            registerUser({
                name,
                email,
                password,
            })
        )
    }

    return (
        <main className="page mt-30">
            <form onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>

                <div className="mb-6">
                    <Input
                        placeholder="Имя"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <Input
                        placeholder="E-mail"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <PasswordInput
                        placeholder="Пароль"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
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
