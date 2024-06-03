import PropTypes from 'prop-types'
import { useMemo } from 'react'
import styles from './ingredient-stub.module.css'

export default function IngredientStub({ title, type }) {
    const className = useMemo(() => {
        const typeClass = type ? styles[`stub_${type}`] : ''

        return `${styles.stub} ${typeClass}`
    }, [type])

    return <div className={className}>{title}</div>
}

IngredientStub.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
}
