import PropTypes from 'prop-types'
import styles from './modal-overlay.module.css'

export default function ModalOverlay({ onClose = () => {} }) {
    return <div className={styles.overlay} onClick={onClose} />
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
}
