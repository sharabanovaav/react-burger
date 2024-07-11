import styles from './modal-overlay.module.css'

type TModalOverlayProps = {
    onClose: () => void
}

export default function ModalOverlay({ onClose }: TModalOverlayProps) {
    return <div className={styles.overlay} onClick={onClose} />
}
