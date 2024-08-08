import { TIngredient , TOrder, TUser } from "../types";

export const BUN: TIngredient = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "643d69a5c3f7b9001cfa093c"
}

export const MAIN: TIngredient = {
    calories: 3377,
    carbohydrates: 420,
    fat: 48,
    image: "https://code.s3.yandex.net/react/code/cheese.png",image_large: "https://code.s3.yandex.net/react/code/cheese-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
    name: "Сыр с астероидной плесенью",
    price: 4142,
    proteins: 84,
    type: "main",
    customId: '1',
    __v: 0,
    _id: "643d69a5c3f7b9001cfa094a",
}

export const ORDER: TOrder = {
    _id: '123',
    ingredients: ['1234'],
    status: 'done',
    name: 'order',
    createdAt: '',
    updatedAt: '',
    number: 123,
}

export const USER: TUser = {
    email: 'email',
    name: 'name',
}