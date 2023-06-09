import express from 'express'
import { protect } from '../controllers/authController'
import {
    createMyTask,
    deleteMyTask,
    getMyTask,
    getMyTasks,
    updateMyTask,
    deactivateMyAccount,
    getMyCategories,
    createMyCategory,
    getMyCategory,
    updateMyCategory,
    deleteMyCategory,
    getMyAccount,
    updateMyAccount,
    getMe,
} from '../controllers/meController'
import { uploadImage } from '../controllers/userController'

const router = express.Router()
router.use(protect)

router.route('/').get(getMe)

router.route('/myTasks').get(getMyTasks).post(createMyTask)
router.route('/myTasks/:id').get(getMyTask).patch(updateMyTask).delete(deleteMyTask)

router.route('/myCategories').get(getMyCategories).post(createMyCategory)
router.route('/myCategories/:id').get(getMyCategory).patch(updateMyCategory).delete(deleteMyCategory)

router.route('/myAccount').get(getMyAccount).patch(uploadImage, updateMyAccount).delete(deactivateMyAccount)

export default router
