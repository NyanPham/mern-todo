import { useRef, useEffect, useCallback } from 'react'

function getAfterElement(y: number, otherElements: HTMLDivElement[]) {
    //@ts-ignore
    const state: { offset: number; element: HTMLDivElement | null } = otherElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    )

    return state.element
}

export default function useDraggable(dependencies: any[], finishDropHandler?: () => any) {
    const blocksContainerRef = useRef<HTMLDivElement>(null)
    const blocks = useRef<HTMLDivElement[] | null>(null)
    const draggedBlock = useRef<HTMLDivElement | null>(null)
    const isDragging = useRef<boolean>(false)

    useEffect(() => {
        if (blocksContainerRef.current == null) return
        const container = blocksContainerRef.current

        blocks.current = [...container.querySelectorAll('[data-drag-item]')] as HTMLDivElement[]
        draggedBlock.current = null
    }, [...dependencies])

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        isDragging.current = true
        draggedBlock.current = e.target as HTMLDivElement
        draggedBlock.current.classList.add('use-dragging')
    }

    const handleDragEnd = useCallback(() => {
        isDragging.current = false
        draggedBlock.current?.classList.remove('use-dragging')
        draggedBlock.current = null

        if (typeof finishDropHandler === 'function') {
            const handler = finishDropHandler()
            handler([...(blocksContainerRef.current?.querySelectorAll('[data-drag-item]') || ([] as HTMLDivElement[]))])
        }
    }, [...dependencies, draggedBlock.current])

    const handleDragMove = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            if (isDragging.current === false || blocks.current?.length === 0) return

            const otherBlocks = blocks.current?.filter((block) => block !== draggedBlock.current)

            if (draggedBlock.current == null || otherBlocks == null || otherBlocks.length === 0) return

            const afterElement = getAfterElement(e.clientY, otherBlocks)
            if (afterElement) {
                blocksContainerRef.current?.insertBefore(draggedBlock.current, afterElement)
            } else {
                blocksContainerRef.current?.appendChild(draggedBlock.current)
            }
        },
        [...dependencies, isDragging.current, blocks.current, draggedBlock.current]
    )

    const handleDragDrop = () => {}

    return { blocksContainerRef, handleDragStart, handleDragEnd, handleDragMove, handleDragDrop }
}
