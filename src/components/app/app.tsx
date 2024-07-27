import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from '../../services/store'
import AppHeader from '../app-header/app-header'
import {
    setIsAuthChecked,
    getUser as getUserSelector,
} from '../../services/user/reducer'
import { getUser } from '../../services/user/actions'
import { loadIngredients } from '../../services/ingredients/actions'

import Modal from '../modal/modal'
import {
    Home,
    NotFound,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    Profile,
    Feed,
} from '../../pages'

import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'
import { ProfileData } from '../profile/profile-data/profile-data'
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route'
import { OrderInfo } from '../order-info/order-info'
import { ProfileOrders } from '../profile/profile-orders/profile-orders'

export default function App() {
    const user = useSelector(getUserSelector)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { state } = location

    useEffect(() => {
        dispatch(loadIngredients())

        if (localStorage.getItem('accessToken')) {
            if (!user) {
                dispatch(getUser())
            }
        } else {
            dispatch(setIsAuthChecked(true))
        }
    }, [])

    return (
        <div>
            <AppHeader />
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={<OnlyUnAuth component={<Login />} />}
                />
                <Route
                    path="/register"
                    element={<OnlyUnAuth component={<Register />} />}
                />
                <Route
                    path="/forgot-password"
                    element={<OnlyUnAuth component={<ForgotPassword />} />}
                />
                <Route
                    path="/reset-password"
                    element={<OnlyUnAuth component={<ResetPassword />} />}
                />

                <Route
                    path="/ingredients/:id"
                    element={<IngredientDetails />}
                />

                <Route
                    path="/profile"
                    element={<OnlyAuth component={<Profile />} />}
                >
                    <Route
                        index
                        element={<OnlyAuth component={<ProfileData />} />}
                    />
                    <Route
                        path="orders"
                        element={<OnlyAuth component={<ProfileOrders />} />}
                    />
                </Route>

                <Route
                    path="/profile/orders/:id"
                    element={<OnlyAuth component={<OrderInfo />} />}
                />

                <Route path="/feed" element={<Feed />} />
                <Route path="/feed/:id" element={<OrderInfo />} />

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

                    <Route
                        path="/feed/:id"
                        element={
                            <Modal onClose={() => navigate(-1)}>
                                <OrderInfo />
                            </Modal>
                        }
                    />

                    <Route
                        path="/profile/orders/:id"
                        element={
                            <OnlyAuth
                                component={
                                    <Modal onClose={() => navigate(-1)}>
                                        <OrderInfo />
                                    </Modal>
                                }
                            />
                        }
                    />
                </Routes>
            )}
        </div>
    )
}
