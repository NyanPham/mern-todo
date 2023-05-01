import express from 'express'
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/taskController'
import { protect, restrictTo } from '../controllers/authController'
const router = express.Router()
    
router.use(protect)
//@ts-ignore
router.use(restrictTo('admin'))
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

export default router