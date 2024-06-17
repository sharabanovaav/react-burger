const apiConfig = {
    baseUrl: 'https://norma.nomoreparties.space/api',
}

const getResponse = (res) => {
    if (res.ok) {
        return res.json()
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
            // TODO: FIXME:
            console.log('refreshToken', refreshToken)
            localStorage.setItem('accessToken', accessToken)

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
            // TODO: FIXME:
            console.log('refreshToken', refreshToken)
            localStorage.setItem('accessToken', accessToken)

            return user
        })

const refreshToken = (
    { token } // "значение refreshToken"
) =>
    fetch(`${apiConfig.baseUrl}/auth/token`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            token,
        }),
    }).then(getResponse)
// auth/token
// "success": true,
//   "accessToken": "Bearer ...",
//   "refreshToken": ""

const logout = (
    { token } // "значение refreshToken"
) =>
    fetch(`${apiConfig.baseUrl}/auth/logout`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            token,
        }),
    }).then(getResponse)
// {
//     "success": true,
//     "message": "Successful logout"
//   }

const getUser = () =>
    fetch(`${apiConfig.baseUrl}/auth/user`, {
        headers: {
            Authorization: localStorage.getItem('accessToken'),
        },
        method: 'GET',
    })
        .then(getResponse)
        .then(({ user }) => user)

const updateUser = ({ email, name }) =>
    fetch(`${apiConfig.baseUrl}/auth/logout`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
        },
        method: 'PATCH',
        body: JSON.stringify({
            email,
            name,
        }),
    }).then(getResponse)
// {
//     "success": true,
//     "user": {
//       "email": "",
//       "name": ""
//     }
//   }

export const api = {
    refreshToken,
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
