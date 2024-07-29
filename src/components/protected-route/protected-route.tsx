import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from '../../services/store'
import { getIsAuthChecked, getUser } from '../../services/user/reducer'
import Loader from '../loader/loader'

type TProtectedRouteProps = {
    onlyUnAuth?: boolean
    component: JSX.Element
}

type TOnlyUnAuthProps = {
    component: JSX.Element
}

function ProtectedRoute({
    onlyUnAuth = false,
    component,
}: TProtectedRouteProps) {
    const isAuthChecked = useSelector(getIsAuthChecked)
    const user = useSelector(getUser)
    const location = useLocation()

    if (!isAuthChecked) {
        return <Loader title="Загрузка..." />
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } }
        return <Navigate to={from} />
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return component
}

export const OnlyAuth = ProtectedRoute
export function OnlyUnAuth({ component }: TOnlyUnAuthProps) {
    return <ProtectedRoute onlyUnAuth component={component} />
}
