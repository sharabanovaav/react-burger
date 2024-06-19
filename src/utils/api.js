import {
    RESET_PASSWORD_LC_KEY,
    ACCESS_TOKEN_LC_KEY,
    REFRESH_TOKEN_LC_KEY,
} from '../consts/local-storage-keys.ts'

const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const checkReponse = (res) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

export const renewRefreshToken = () =>
    fetch(`${BURGER_API_URL}/auth/token`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem(REFRESH_TOKEN_LC_KEY),
        }),
    })
        .then(checkReponse)
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData)
            }
            localStorage.setItem(REFRESH_TOKEN_LC_KEY, refreshData.refreshToken)
            localStorage.setItem(ACCESS_TOKEN_LC_KEY, refreshData.accessToken)
            return refreshData
        })

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options)
        return await checkReponse(res)
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await renewRefreshToken()
            options.headers.authorization = refreshData.accessToken
            const res = await fetch(url, options)
            return checkReponse(res)
        }
        return Promise.reject(err)
    }
}

const getIngredients = () =>
    fetch(`${BURGER_API_URL}/ingredients`).then(checkReponse)

const makeOrder = (ingredients) =>
    fetchWithRefresh(`${BURGER_API_URL}/orders`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem(ACCESS_TOKEN_LC_KEY),
        },
        method: 'POST',
        body: JSON.stringify({
            ingredients,
        }),
    })

const getResetToken = (email) =>
    fetch(`${BURGER_API_URL}/password-reset`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
        }),
    })
        .then(checkReponse)
        .then(() => localStorage.setItem(RESET_PASSWORD_LC_KEY, true))

const resetPassword = ({ password, token }) =>
    fetch(`${BURGER_API_URL}/password-reset/reset`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            password,
            token,
        }),
    }).then(checkReponse)

const registerUser = ({ email, password, name }) =>
    fetch(`${BURGER_API_URL}/auth/register`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    })
        .then(checkReponse)
        .then(({ accessToken, refreshToken, user }) => {
            localStorage.setItem(ACCESS_TOKEN_LC_KEY, accessToken)
            localStorage.setItem(REFRESH_TOKEN_LC_KEY, refreshToken)

            return user
        })

const login = ({ email, password }) =>
    fetch(`${BURGER_API_URL}/auth/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then(checkReponse)
        .then(({ accessToken, refreshToken, user }) => {
            localStorage.setItem(ACCESS_TOKEN_LC_KEY, accessToken)
            localStorage.setItem(REFRESH_TOKEN_LC_KEY, refreshToken)

            return user
        })

const logout = () =>
    fetch(`${BURGER_API_URL}/auth/logout`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem(REFRESH_TOKEN_LC_KEY),
        }),
    })
        .then(checkReponse)
        .then(() => {
            localStorage.removeItem(ACCESS_TOKEN_LC_KEY)
            localStorage.removeItem(REFRESH_TOKEN_LC_KEY)
        })

const getUser = () =>
    fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
        headers: {
            authorization: localStorage.getItem(ACCESS_TOKEN_LC_KEY),
        },
        method: 'GET',
    }).then(({ user }) => user)

const updateUser = ({ email, name, password }) =>
    fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
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
