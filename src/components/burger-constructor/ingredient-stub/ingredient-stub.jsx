import PropTypes from 'prop-types'
import { useMemo } from 'react'
import styles from './ingredient-stub.module.css'

export default function IngredientStub({ title, type, hovered }) {
    const className = useMemo(() => {
        const typeClass = type ? styles[`stub_${type}`] : ''
        const hoverClass = hovered ? styles.hovered : ''

        return `${styles.stub} ${typeClass} ${hoverClass}`
    }, [type, hovered])

    return <div className={className}>{title}</div>
}

IngredientStub.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    hovered: PropTypes.bool,
}
