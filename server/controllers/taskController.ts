import Task from "../models/Task"
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factoryController"
    
export const getAllTasks = getAll(Task)
export const createTask = createOne(Task, { isAuthBased: true, field: 'userId' })
export const getTask = getOne(Task)
export const updateTask = updateOne(Task)
export const deleteTask = deleteOne(Task)