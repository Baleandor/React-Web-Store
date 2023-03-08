import axios from 'axios'
import { CategoryItemDetailsType } from '../types'

export const getCategories = (): Promise<string[]> => axios.get('https://fakestoreapi.com/products/categories').then((response) => response.data)

export const getCategory = (category_id: string | undefined): Promise<CategoryItemDetailsType[]> => axios.get(`https://fakestoreapi.com/products/category/${category_id}`).then((response) => response.data)

export const getCategoryItem = (item_id: string | undefined): Promise<CategoryItemDetailsType> => axios.get(`https://fakestoreapi.com/products/${item_id}`).then((response) => response.data)



