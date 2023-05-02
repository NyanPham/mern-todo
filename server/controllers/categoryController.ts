import Category from "../models/Category"
import { createOne, deleteOne, getAll, getOne, updateOne } from "./factoryController"

export const getAllCategories = getAll(Category)
export const createCategory = createOne(Category, { isAuthBased: true, field: 'userId' })
export const getCategory = getOne(Category)
export const updateCategory = updateOne(Category)
export const deleteCategory = deleteOne(Category)