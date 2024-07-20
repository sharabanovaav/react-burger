import {
    RESET_PASSWORD_LC_KEY,
    ACCESS_TOKEN_LC_KEY,
    REFRESH_TOKEN_LC_KEY,
} from '../consts/local-storage-keys'
import { TIngredient, TIngredientsResponse, TLoginResponse, TOrderResponse, TResetForm, TTokenResponse, TUserForm, TUserResponse } from '../types'

const BURGER_API_URL = 'https://norma.nomoreparties.space/api'

const request = <T>(endpoint: string, options?: RequestInit): Promise<T> =>
    fetch(`${BURGER_API_URL}/${endpoint}`, options).then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )

export const renewRefreshToken = () =>
    request<TTokenResponse>('auth/token', {
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

export const fetchWithRefresh = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    try {
        return await request<T>(endpoint, options)
    } catch (error: any) {
        if (error?.message === 'jwt expired') {
            const refreshData = await renewRefreshToken()
            const headers = options?.headers ? new Headers(options.headers) : new Headers();

            headers.set("Authorization", refreshData.accessToken);
            if (options) {
                options.headers = headers
            }
           
            return request(endpoint, options)
        }
        return Promise.reject(error)
    }
}

const makeOrder = (ingredients: string[]) =>
    fetchWithRefresh<TOrderResponse>('orders', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN_LC_KEY) ?? '',
        },
        method: 'POST',
        body: JSON.stringify({
            ingredients,
        }),
    })

const getUser = () =>
    fetchWithRefresh<TUserResponse>('auth/user', {
        headers: {
            Authorization: localStorage.getItem(ACCESS_TOKEN_LC_KEY) ?? '',
        },
        method: 'GET',
    }).then(({ user }) => user)

const updateUser = ({ email, name, password }: TUserForm) =>
    fetchWithRefresh<TUserResponse>('auth/user', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN_LC_KEY) ?? '',
        },
        method: 'PATCH',
        body: JSON.stringify({
            email,
            name,
            password,
        }),
    }).then(({ user }) => user)

const getIngredients = () => request<TIngredientsResponse>('ingredients')

const getResetToken = (email: string) =>
    request('password-reset', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            email,
        }),
    }).then(() => localStorage.setItem(RESET_PASSWORD_LC_KEY, 'true'))

const resetPassword = ({ password, token }: TResetForm) =>
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

const registerUser = ({ email, password, name }: TUserForm) =>
    request<TLoginResponse>('auth/register', {
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

const login = ({ email, password }: Omit<TUserForm, 'name'>) =>
    request<TLoginResponse>('auth/login', {
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
