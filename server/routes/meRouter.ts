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
} from '../controllers/meController'

const router = express.Router()
router.use(protect)

router.route('/myTasks').get(getMyTasks).post(createMyTask)
router.route('/myTasks/:id').get(getMyTask).patch(updateMyTask).delete(deleteMyTask)

router.route('/myCategories').get(getMyCategories).post(createMyCategory)
router.route('/myCategories/:id').get(getMyCategory).patch(updateMyCategory).delete(deleteMyCategory)

router.delete('/myAccount', deactivateMyAccount)

export default router
