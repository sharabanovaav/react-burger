import { useMemo } from 'react'
import styles from './ingredient-stub.module.css'

type TIngredientStubProps = {
    title: string
    hovered: boolean
    type?: string
}

export default function IngredientStub({ title, type, hovered }: TIngredientStubProps) {
    const className = useMemo(() => {
        const typeClass = type ? styles[`stub_${type}`] : ''
        const hoverClass = hovered ? styles.hovered : ''

        return `${styles.stub} ${typeClass} ${hoverClass}`
    }, [type, hovered])

    return <div className={className}>{title}</div>
}
