import express from 'express'
import {
    register,
    login,
    updatePassword,
    protect,
    forgotPassword,
    resetPassword,
    logout,
} from '../controllers/authController'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.patch('/updatePassword', protect, updatePassword)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:resetToken', resetPassword)

export default router
