import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from './modal-overlay.module.css'

export default function ModalOverlay({ onClose = () => {} }) {
    const closeHandler = (e) => {
        if (e.keyCode === 27) {
            onClose()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', closeHandler)
        return () => window.removeEventListener('keydown', closeHandler)
    }, [])

    return (
        <div
            className={styles.overlay}
            onClick={onClose}
            onKeyDown={closeHandler}
        />
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
}
