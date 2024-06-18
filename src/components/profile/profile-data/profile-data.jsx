import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../services/user/reducer'
import { updateUser } from '../../../services/user/actions'
import styles from './profile-data.module.css'

export function ProfileData() {
    const user = useSelector(getUser)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        dispatch(
            updateUser({
                email,
                name,
                password,
            })
        )
    }

    const resetData = () => {
        setName(user.name)
        setEmail(user.email)
        setPassword('')
    }

    useEffect(() => {
        resetData()
    }, [user])

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className="mb-6">
                <Input
                    placeholder="Имя"
                    value={name}
                    icon="EditIcon"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <Input
                    placeholder="Логин"
                    value={email}
                    icon="EditIcon"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <PasswordInput
                    placeholder="Пароль"
                    icon="EditIcon"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className={styles.buttons}>
                <Button
                    type="secondary"
                    htmlType="button"
                    onClick={() => resetData()}
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
