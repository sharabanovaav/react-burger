import { Routes, Route } from 'react-router-dom'
import AppHeader from '../app-header/app-header'
import { Home, NotFound, Login, Register, ForgotPassword } from '../../pages'

export default function App() {
    return (
        <div>
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="*" element={<NotFound />} />

                {/* 
                    /reset-password - страница сброса пароля.
                    /profile — страница с настройками профиля пользователя.
                    /ingredients/:id — страница ингредиента.
                 */}
            </Routes>
        </div>
    )
}
