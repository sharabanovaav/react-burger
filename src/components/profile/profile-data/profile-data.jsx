import {
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'

export function ProfileData() {
    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
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
                    value={login}
                    icon="EditIcon"
                    onChange={(e) => setLogin(e.target.value)}
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
        </form>
    )
}
