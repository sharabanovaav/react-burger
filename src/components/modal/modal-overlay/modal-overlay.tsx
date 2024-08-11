import { MODAL_OVERLAY } from '../../../consts/e2e-selectors'
import styles from './modal-overlay.module.css'

type TModalOverlayProps = {
    onClose: () => void
}

export default function ModalOverlay({ onClose }: TModalOverlayProps) {
    return (
        <div
            className={styles.overlay}
            data-testid={MODAL_OVERLAY}
            onClick={onClose}
        />
    )
}
