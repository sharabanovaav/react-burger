import { useState, ChangeEvent } from 'react'

type TUseForm<T> = {
    values: T;
    handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
    setValues: (state: T) => void;
    resetForm: () => void
  }

export function useForm<T>(initialValues: T): TUseForm<T> {
    const [values, setValues] = useState(initialValues)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setValues({ ...values, [name]: value })
    }

    const resetForm = () => {
        setValues(initialValues)
    }

    return { values, handleChange, setValues, resetForm }
}
