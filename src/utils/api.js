import {
    RESET_PASSWORD_LC_KEY,
    ACCESS_TOKEN_LC_KEY,
    REFRESH_TOKEN_LC_KEY,
} from '../consts/local-storage-keys.ts'

const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const request = (endpoint, options) =>
    fetch(`${BURGER_API_URL}/${endpoint}`, options).then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )

export const renewRefreshToken = () =>
    request('auth/token', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem(REFRESH_TOKEN_LC_KEY),
        }),
    }).then((refreshData) => {
        if (!refreshData.success) {
            return Promise.reject(refreshData)
        }
        localStorage.setItem(REFRESH_TOKEN_LC_KEY, refreshData.refreshToken)
        localStorage.setItem(ACCESS_TOKEN_LC_KEY, refreshData.accessToken)
        return refreshData
    })

export const fetchWithRefresh = async (endpoint, options) => {
    try {
        return await request(endpoint, options)
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await renewRefreshToken()
            options.headers.authorization = refreshData.accessToken
            return request(endpoint, options)
        }
        return Promise.reject(err)
    }
}

const makeOrder = (ingredients) =>
    fetchWithRefresh('orders', {
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem(ACCESS_TOKEN_LC_KEY),
        },
        method: 'POST',
        body: JSON.stringify({
            ingredients,
        }),
    })

const getUser = () =>
    fetchWithRefresh('auth/user', {
        headers: {
            authorization: localStorage.getItem(ACCESS_TOKEN_LC_KEY),
        },
        method: 'GET',
    }).then(({ user }) => user)

const updateUser = ({ email, name, password }) =>
    fetchWithRefresh('auth/user', {
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem(ACCESS_TOKEN_LC_KEY),
        },
        method: 'PATCH',
        body: JSON.stringify({
            email,
            name,
            password,
        }),
    }).then(({ user }) => user)

const getIngredients = () => request('ingredients')

const getResetToken = (email) =>
    request('password-reset', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
        }),
    }).then(() => localStorage.setItem(RESET_PASSWORD_LC_KEY, true))

const resetPassword = ({ password, token }) =>
    request('password-reset/reset', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            password,
            token,
        }),
    }).then(() => localStorage.removeItem(RESET_PASSWORD_LC_KEY))

const registerUser = ({ email, password, name }) =>
    request('auth/register', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    }).then(({ accessToken, refreshToken, user }) => {
        localStorage.setItem(ACCESS_TOKEN_LC_KEY, accessToken)
        localStorage.setItem(REFRESH_TOKEN_LC_KEY, refreshToken)

        return user
    })

const login = ({ email, password }) =>
    request('auth/login', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(({ accessToken, refreshToken, user }) => {
        localStorage.setItem(ACCESS_TOKEN_LC_KEY, accessToken)
        localStorage.setItem(REFRESH_TOKEN_LC_KEY, refreshToken)

        return user
    })

const logout = () =>
    request('auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem(REFRESH_TOKEN_LC_KEY),
        }),
    }).then(() => {
        localStorage.removeItem(ACCESS_TOKEN_LC_KEY)
        localStorage.removeItem(REFRESH_TOKEN_LC_KEY)
    })

export const api = {
    getUser,
    updateUser,
    login,
    logout,
    registerUser,
    getResetToken,
    makeOrder,
    resetPassword,
    getIngredients,
}
