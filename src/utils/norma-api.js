const apiConfig = {
    baseUrl: 'https://norma.nomoreparties.space/api',
}

const getResponse = (res) => {
    if (res.ok) {
        return res.json()
    }

    throw new Error(`Ошибка ${res.status}`)
}

export const getIngredients = () =>
    fetch(`${apiConfig.baseUrl}/ingredients`).then(getResponse)

export const makeOrder = (ingredients) =>
    fetch(`${apiConfig.baseUrl}/orders`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            ingredients,
        }),
    }).then(getResponse)

export const getResetToken = (email) =>
    fetch(`${apiConfig.baseUrl}/password-reset`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
        }),
    }).then(getResponse)

export const resetPassword = ({ password, token }) =>
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

export const registerUser = ({ email, password, name }) =>
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
    }).then(getResponse)
