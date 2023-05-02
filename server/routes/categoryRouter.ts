import express from 'express'
import { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController'
import { protect, restrictTo } from '../controllers/authController'

const router = express.Router()
    
router.use(protect)
//@ts-ignore
router.use(restrictTo('admin'))
router.route('/').get(getAllCategories).post(createCategory)
router.route('/:id').get(getCategory).patch(updateCategory).delete(deleteCategory)

export default router