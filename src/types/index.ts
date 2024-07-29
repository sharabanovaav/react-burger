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

export type TLoginResponse = TTokenResponse & TUserResponse

export type TCreateOrderResponse = {
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

export type TIngredientsResponse = {
    data: TIngredient[]
}

export type TOrder = {
    _id: string
    ingredients: string[]
    status: 'done' | 'created' | 'pending' 
    name: string
    createdAt: string
    updatedAt: string
    number: number
}

export type TAllOrdersResponse = {
    orders: TOrder[]
    total: number
    totalToday: number
}

export type TUserOrdersResponse = {
    orders: TOrder[]
}

export type TGetOrderByNumberResponse = {
    success: boolean
    orders: TOrder[]
}

export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success'
