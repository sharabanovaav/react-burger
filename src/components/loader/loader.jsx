import PropTypes from 'prop-types'
import styles from './loader.module.css'

export default function Loader({ title }) {
    return (
        <div className={styles.wrapper}>
            {title && (
                <h1 className="text text_type_main-large mb-20">{title}</h1>
            )}

            <div className={styles.loader} />
        </div>
    )
}

Loader.propTypes = {
    title: PropTypes.string,
}
