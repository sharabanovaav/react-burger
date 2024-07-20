import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, FormEvent } from 'react'
import { useDispatch, useSelector } from '../../../services/store'
import { getUser } from '../../../services/user/reducer'
import { updateUser } from '../../../services/user/actions'
import styles from './profile-data.module.css'
import { useForm } from '../../../hooks/use-form'
import { TUserForm } from '../../../types'

export function ProfileData() {
    const user = useSelector(getUser)
    const dispatch = useDispatch()

    const { values, handleChange, resetForm } = useForm<TUserForm>({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { email, name, password } = values

        dispatch(
            updateUser({
                email,
                name,
                password,
            })
        )
    }

    useEffect(() => {
        resetForm()
    }, [user])

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className="mb-6">
                <Input
                    placeholder="Имя"
                    value={values.name}
                    icon="EditIcon"
                    name="name"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <Input
                    placeholder="Логин"
                    value={values.email}
                    icon="EditIcon"
                    name="email"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <PasswordInput
                    placeholder="Пароль"
                    icon="EditIcon"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.buttons}>
                <Button
                    type="secondary"
                    htmlType="button"
                    onClick={() => resetForm()}
                >
                    Отмена
                </Button>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </div>
        </form>
    )
}
