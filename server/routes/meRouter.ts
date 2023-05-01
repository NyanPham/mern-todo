import express from 'express'
import { protect } from '../controllers/authController'
import { createMyTask, deleteMyTask, getMyTask, getMyTasks, updateMyTask, deactivateMyAccount } from '../controllers/meController'

const router = express.Router()
router.use(protect)    

router.route('/myTasks').get(getMyTasks).post(createMyTask)
router.route('/myTasks/:id').get(getMyTask).patch(updateMyTask).delete(deleteMyTask)
router.delete('/myAccount', deactivateMyAccount)

export default router