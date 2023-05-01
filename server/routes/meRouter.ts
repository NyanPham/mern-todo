import express from 'express'
import { protect } from '../controllers/authController'
import { createMyTask, deleteMyTask, getMyTask, getMyTasks, updateMyTask } from '../controllers/meController'

const router = express.Router()
router.use(protect)    

router.route('/myTasks').get(getMyTasks).post(createMyTask)
router.route('/myTasks/:id').get(getMyTask).patch(updateMyTask).delete(deleteMyTask)

export default router