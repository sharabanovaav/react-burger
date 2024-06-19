import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getIsAuthChecked, getUser } from '../../services/user/reducer'
import Loader from '../loader/loader'

function ProtectedRoute({ onlyUnAuth = false, component }) {
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
export function OnlyUnAuth({ component }) {
    return <ProtectedRoute onlyUnAuth component={component} />
}

ProtectedRoute.propTypes = {
    onlyUnAuth: PropTypes.bool,
    component: PropTypes.element.isRequired,
}

OnlyUnAuth.propTypes = {
    component: PropTypes.element.isRequired,
}
