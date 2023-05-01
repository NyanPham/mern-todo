import express from 'express'
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/userController'
import { protect, restrictTo } from '../controllers/authController'
    
const router = express.Router()

router.use(protect)
//@ts-ignore
router.use(restrictTo('admin'))
router.route("/").get(protect, getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
    
export default router