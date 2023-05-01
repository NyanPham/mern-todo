import express from 'express'
import { register, login, updatePassword, protect, forgotPassword, resetPassword } from '../controllers/authController'
    
const router = express.Router()
    
router.post('/register', register)
router.post('/login', login)
router.post('/updatePassword', protect, updatePassword)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:resetToken', resetPassword)

export default router