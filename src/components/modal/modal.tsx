import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, ReactNode } from 'react'
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'

type TModalProps = {
    children: ReactNode
    onClose: () => void
    title?: string
}

export default function Modal({ title = '', children, onClose }: TModalProps) {
    const modalRoot = document.getElementById('react-modals')

    useEffect(() => {
        const closeHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', closeHandler)
        return () => window.removeEventListener('keydown', closeHandler)
    }, [onClose])

    return modalRoot ? ReactDOM.createPortal(
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
    ) : null
}
