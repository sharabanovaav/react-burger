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
