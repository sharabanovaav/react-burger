import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { useDrop, useDrag } from 'react-dnd'
import { useRef } from 'react'
import styles from './draggable-ingredient.module.css'
import { TIngredient } from '../../../types'

type TDragObject = {
    index: number
}

type TCollectedProps = {
    isDragging: boolean
}

type TDraggableIngredientProps = {
    ingredient: TIngredient
    index: number
    onDelete: (id: string) => void
    onMove: (dragIndex: number, hoverIndex: number) => void
}

export default function DraggableIngredient({
    ingredient,
    index,
    onDelete,
    onMove,
}: TDraggableIngredientProps) {
    const ref = useRef<HTMLDivElement | null>(null)

    const [_, drop] = useDrop<TDragObject, unknown, unknown>({
        accept: 'ingredientCard',
        hover(item, monitor) {
            if (!ref.current) return

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()

            if (!clientOffset) return

            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            onMove(dragIndex, hoverIndex)

            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag<TDragObject, unknown, TCollectedProps>({
        type: 'ingredientCard',
        item: () => ({ index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))

    return (
        <div
            style={{ opacity: isDragging ? 0.3 : 1 }}
            className={styles.ingredient}
            key={ingredient.customId}
            ref={ref}
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => onDelete(ingredient.customId ?? '')}
            />
        </div>
    )
}


