import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import { useDrop, useDrag } from 'react-dnd'
import { useRef } from 'react'
import ingredientPropTypes from '../../../consts/ingredient-prop-types.ts'
import styles from './draggable-ingredient.module.css'

export default function DraggableIngredient({
    ingredient,
    index,
    onDelete,
    onMove,
}) {
    const ref = useRef(null)

    // eslint-disable-next-line no-unused-vars
    const [_, drop] = useDrop({
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
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            onMove(dragIndex, hoverIndex)

            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
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
                handleClose={() => onDelete(ingredient.customId)}
            />
        </div>
    )
}

DraggableIngredient.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    index: PropTypes.number,
    onDelete: PropTypes.func,
    onMove: PropTypes.func,
}
