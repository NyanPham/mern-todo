import { useEffect, useState } from 'react'
import Heading from '../Heading'
import InputWithPlus from '../inputs/InputWithPlus'
import Category from './Category'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import { open as openToast, setToastInfo } from '../../redux/toastSlice'
import { createCategoryAsync, removeCategories, selectCategory, setCategoriesFromUser } from '../../redux/categorySlice'

const Categories = () => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)
    const categories = useAppSelector((state) => state.category.categories)
    const currentCategoryId = useAppSelector((state) => state.category.currentCategoryId)
    const dispatch = useAppDispatch()

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

    function onPlusIconClick() {
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

    function handleCategoryClick(categoryId: string) {
        dispatch(selectCategory({ categoryId }))
    }

    return (
        <div className="w-1/4 bg-white/20 rounded-lg backdrop-blur-lg shadow-white">
            <div className="p-4">
                <Heading title="List" subtitle="Task Categories" />
            </div>
            <hr />
            <div className="max-h-96 overflow-y-auto transition-all duration-250">
                {currentUser &&
                    categories &&
                    categories.map((category) => (
                        <Category
                            key={category._id}
                            title={category.title}
                            id={category._id}
                            onClick={handleCategoryClick}
                            isSelected={currentCategoryId === category._id}
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
                    onPlusIconClick={onPlusIconClick}
                />
            </div>
        </div>
    )
}

export default Categories
