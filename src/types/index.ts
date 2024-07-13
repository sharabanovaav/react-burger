export type TUser = {
    email: string
    name: string
}

export type TUserForm = TUser & {
    password: string
}

export type TTokenResponse = {
    success: boolean
    refreshToken: string
    accessToken: string
}

export type TUserResponse = {
    success: boolean
    user: TUser
}

export type TIngredientsResponse = {
    data: TIngredient[]
}

export type TLoginResponse = TTokenResponse & TUserResponse

export type TOrderResponse = {
    success: boolean
    order: {
        number: number
    }
}

export type TResetForm = {
    token: string
    password: string
}

export type TIngredientType = "sauce" | "main" | "bun"

export type TIngredient = {
    _id: string
    price: number
    name: string
    image: string
    image_large: string
    type: TIngredientType
    calories: number
    proteins: number
    fat: number
    carbohydrates: number
    customId?: string
}

export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success'
