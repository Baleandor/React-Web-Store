import { CategoryItemDetailsType } from "../types"

export const autofillResults = (data: CategoryItemDetailsType[], searchParams: string | undefined) => {
    return data?.filter((result) => {
        if (searchParams) {
             result.title.toLocaleLowerCase().includes(searchParams)
        }
    })

} 