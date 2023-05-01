import express from 'express'
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/userController'
import { protect, restrictTo } from '../controllers/authController'
    
const router = express.Router()

// For User
//@ts-ignore
router.route("/").get(protect, restrictTo('user'), getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router