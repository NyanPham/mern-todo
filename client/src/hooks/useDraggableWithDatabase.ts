import { useCallback } from 'react'
import useDraggable from './useDraggable'
import { changeTaskOrdersAsync } from '../redux/taskSlice'
import { changeCategoryOrdersAsync } from '../redux/categorySlice'
import { useAppDispatch } from './reduxHooks'
import { UpdateOrder } from '../types'

export default function useDraggableWithDatabase(dependencies: any[], type: 'category' | 'task') {
    const dispatch = useAppDispatch()

    const finishDropHandler = useCallback(() => {
        return (blocks: HTMLDivElement[]) => {
            //@ts-ignore
            const blocksOrder = blocks.map((block: HTMLDivElement, index: number) => ({
                id: block.dataset.dragItem,
                displayOrder: index,
            })) as UpdateOrder[]

            if (type === 'category') {
                dispatch(changeCategoryOrdersAsync(blocksOrder))
            } else {
                dispatch(changeTaskOrdersAsync(blocksOrder))
            }
        }
    }, [...dependencies, dispatch, type])

    const { blocksContainerRef, handleDragStart, handleDragEnd, handleDragMove, handleDragDrop } = useDraggable(
        [...dependencies],
        finishDropHandler
    )

    return { blocksContainerRef, handleDragStart, handleDragEnd, handleDragMove, handleDragDrop }
}
