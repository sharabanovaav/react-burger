import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'

export default function Modal({ title, onClose = () => {}, children }) {
    const modalRoot = document.getElementById('react-modals')

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />

            <div className={`${styles.modal} pt-10 pl-10 pr-10 pb-15`}>
                <div className={`${styles.header}`}>
                    <h1 className="text text_type_main-large">{title}</h1>

                    <div className={styles.icon}>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>
                </div>

                {children}
            </div>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.elementType,
    onClose: PropTypes.func,
}
