import axios from 'axios'
import { CategoryItemDetailsType } from '../types'

const fakestore = 'https://fakestoreapi.com/products'

export const getCategories = (): Promise<string[]> => axios.get(`${fakestore}/categories`).then((response) => response.data)

export const getCategory = (category_id: string | undefined): Promise<CategoryItemDetailsType[]> => axios.get(`${fakestore}/category/${category_id}`).then((response) => response.data)

export const getCategoryItem = (item_id: string | number | undefined): Promise<CategoryItemDetailsType> => axios.get(`${fakestore}/products/${item_id}`).then((response) => response.data)

export const getAllItems = (): Promise<CategoryItemDetailsType[]> => axios.get(`${fakestore}`).then((response) => response.data)

