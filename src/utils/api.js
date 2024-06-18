const apiConfig = {
    baseUrl: 'https://norma.nomoreparties.space/api',
}

const getResponse = async (res) => {
    if (res.ok) {
        return res.json()
    }

    if (res.status === 403) {
        return Promise.reject(res)
    }

    throw new Error(`Ошибка ${res.status}`)
}

const getIngredients = () =>
    fetch(`${apiConfig.baseUrl}/ingredients`).then(getResponse)

const makeOrder = (ingredients) =>
    fetch(`${apiConfig.baseUrl}/orders`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            ingredients,
        }),
    }).then(getResponse)

const getResetToken = (email) =>
    fetch(`${apiConfig.baseUrl}/password-reset`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
        }),
    }).then(getResponse)

const resetPassword = ({ password, token }) =>
    fetch(`${apiConfig.baseUrl}/password-reset/reset`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            password,
            token,
        }),
    }).then(getResponse)

const registerUser = ({ email, password, name }) =>
    fetch(`${apiConfig.baseUrl}/auth/register`, {
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
        .then(getResponse)
        .then(({ accessToken, refreshToken, user }) => {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            return user
        })

const login = ({ email, password }) =>
    fetch(`${apiConfig.baseUrl}/auth/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then(getResponse)
        .then(({ accessToken, refreshToken, user }) => {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            return user
        })

const getRefreshToken = () =>
    fetch(`${apiConfig.baseUrl}/auth/token`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(getResponse)
        .then(({ accessToken, refreshToken }) => {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
        })

const logout = () =>
    fetch(`${apiConfig.baseUrl}/auth/logout`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(getResponse)
        .then(() => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        })

const getUser = () =>
    fetch(`${apiConfig.baseUrl}/auth/user`, {
        headers: {
            Authorization: localStorage.getItem('accessToken'),
        },
        method: 'GET',
    })
        .then(getResponse)
        .then(({ user }) => user)
        .catch(async (error) => {
            if (error.status === 403) {
                await getRefreshToken()
                await getUser()
            }
        })

const updateUser = ({ email, name, password }) =>
    fetch(`${apiConfig.baseUrl}/auth/user`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
        },
        method: 'PATCH',
        body: JSON.stringify({
            email,
            name,
            password,
        }),
    })
        .then(getResponse)
        .then(({ user }) => user)

export const api = {
    getRefreshToken,
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
