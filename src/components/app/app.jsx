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
    Profile,
} from '../../pages'

import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'
import { ProfileData } from '../profile/profile-data/profile-data'

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

                <Route path="/profile" element={<Profile />}>
                    <Route index element={<ProfileData />} />
                    <Route path="orders" element={<div />} />
                </Route>

                <Route path="*" element={<NotFound />} />
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
