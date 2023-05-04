import path from 'path'
import User from '../models/User'
import { createOne, deleteOne, getAll, getOne, updateOne } from './factoryController'
import multer, { StorageEngine } from 'multer'

const ALLOWED_IMAGE_EXTENSIONS = ['image/jpeg', 'image/jpg', 'imae/png']
const multerStorage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'images', 'avatars'))
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`
        cb(null, uniqueName)
    },
})

const upload = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb: multer.FileFilterCallback) => {
        if (ALLOWED_IMAGE_EXTENSIONS.includes(file.mimetype)) {
            cb(null, true)
        } else {
            // @ts-ignore
            cb(new Error('Please upload an jpeg, jpg or png image only!'), false)
        }
    },
})

export const uploadImage = upload.single('imageSrc')

export const getAllUsers = getAll(User)
export const createUser = createOne(User)
export const getUser = getOne(User)
export const updateUser = updateOne(User, ['role', 'password', 'passwordConfirm'])
export const deleteUser = deleteOne(User)
