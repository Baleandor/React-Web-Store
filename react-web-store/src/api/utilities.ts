import axios from 'axios'



export const getCategories = (): Promise<string[]> => axios.get('https://fakestoreapi.com/products/categories').then((response) => response.data)


export const getCategory = (category: string): Promise<object[]> => axios.get(`https://fakestoreapi.com/products/category/${category}`).then((response) => response.data)



