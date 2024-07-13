import { useState, useCallback } from 'react'

type TUseModal = {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void
}

export function useModal(): TUseModal {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    return {
        isModalOpen,
        openModal,
        closeModal,
    }
}
