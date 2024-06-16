import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import AppHeader from '../app-header/app-header'
import Modal from '../modal/modal'
import {
    Home,
    NotFound,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
} from '../../pages'

import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'

export default function App() {
    const location = useLocation()
    const navigate = useNavigate()

    const { state } = location

    return (
        <div>
            <AppHeader />
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/ingredients/:id"
                    element={<IngredientDetails />}
                />
                <Route path="*" element={<NotFound />} />

                {/* 
                    /profile — страница с настройками профиля пользователя.
                 */}
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal
                                title="Детали ингредиента"
                                onClose={() => navigate(-1)}
                            >
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    )
}
