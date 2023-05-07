import { useEffect, useState } from 'react'
import Heading from '../Heading'
import InputWithPlus from '../inputs/InputWithPlus'
import Category from './Category'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import { open as openToast, setToastInfo } from '../../redux/toastSlice'
import {
    createCategoryAsync,
    removeCategories,
    selectCategory,
    setCategoriesFromUser,
    setHighlighted,
} from '../../redux/categorySlice'
import useDraggableWithDatabase from '../../hooks/useDraggableWithDatabase'

const Categories = () => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)
    const categories = useAppSelector((state) => state.category.categories)
    const currentCategoryId = useAppSelector((state) => state.category.currentCategoryId)
    const isHighlighted = useAppSelector((state) => state.category.isHighlighted)
    const dispatch = useAppDispatch()

    const { blocksContainerRef, handleDragStart, handleDragEnd, handleDragMove, handleDragDrop } =
        useDraggableWithDatabase([categories], 'category')

    useEffect(() => {
        if (isHighlighted === true) {
            setTimeout(() => {
                dispatch(setHighlighted(false))
            }, 2000)
        }
    }, [isHighlighted])

    useEffect(() => {
        if (currentUser == null) {
            dispatch(removeCategories())
            return
        }

        if (currentUser.categories == null) return

        dispatch(setCategoriesFromUser({ categories: currentUser.categories }))
    }, [currentUser, dispatch, removeCategories, setCategoriesFromUser])

    const [categoryText, setCategoryText] = useState<string>('')

    function onCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCategoryText(e.target.value)
    }

    function onCreateCategory() {
        if (currentUser == null) {
            dispatch(
                setToastInfo({
                    title: 'Sorry',
                    subtitle: 'You have not logged in yet!',
                    type: 'error',
                })
            )

            dispatch(openToast())
            return
        }

        dispatch(createCategoryAsync({ title: categoryText }))
        setCategoryText('')
    }

    function onEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code !== 'Enter') return
        if (categoryText !== '') onCreateCategory()
    }

    function handleCategoryClick(categoryId: string) {
        dispatch(selectCategory({ categoryId }))
    }

    // Drop end functionalities

    return (
        <div className="w-full bg-white/20 rounded-lg backdrop-blur-lg shadow-white md:w-1/3 lg:w-1/4">
            <div className="p-4">
                <Heading title="List" subtitle="Task Categories" />
            </div>
            <hr />
            <div className="max-h-96 overflow-y-auto transition-all duration-250" ref={blocksContainerRef}>
                {currentUser &&
                    categories &&
                    categories.map((category) => (
                        <Category
                            key={category._id}
                            title={category.title}
                            id={category._id}
                            onClick={handleCategoryClick}
                            isSelected={currentCategoryId === category._id}
                            isHighlighted={isHighlighted}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragMove={handleDragMove}
                            onDragDrop={handleDragDrop}
                        />
                    ))}
            </div>
            <hr />
            <div className="p-4">
                <InputWithPlus
                    id="add-category"
                    type="cateogry"
                    name="category"
                    label="Add category"
                    value={categoryText}
                    required={true}
                    disabled={false}
                    onChange={onCategoryChange}
                    small
                    underlineOnly
                    bgTransparent
                    onPlusIconClick={onCreateCategory}
                    onKeyPress={onEnterPress}
                />
            </div>
        </div>
    )
}

export default Categories
