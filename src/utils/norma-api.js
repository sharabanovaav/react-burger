const apiConfig = {
    baseUrl: 'https://norma.nomoreparties.space/api',
}

const getResponse = (res) => {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(`Ошибка ${res.status}`)
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
