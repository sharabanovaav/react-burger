import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { FormEvent } from 'react'
import { useDispatch } from '../../services/store'
import { registerUser } from '../../services/user/actions'
import { useForm } from '../../hooks/use-form'
import { TUserForm } from '../../types'

export function Register() {
    const { values, handleChange } = useForm<TUserForm>({
        name: '',
        email: '',
        password: '',
    })

    const dispatch = useDispatch()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { email, name, password } = values

        dispatch(
            // @ts-ignore // TODO: FIXME:
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
