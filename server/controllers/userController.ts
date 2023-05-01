import User from "../models/User"
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factoryController"

export const getAllUsers = getAll(User)
export const createUser = createOne(User)
export const getUser = getOne(User, { path: 'tasks', select: '-__v' })
export const updateUser = updateOne(User, ['role', 'password', 'passwordConfirm'])
export const deleteUser = deleteOne(User)