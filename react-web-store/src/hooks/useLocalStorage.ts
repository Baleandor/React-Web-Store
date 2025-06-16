import { useEffect, useState } from "react";


export function useLocalStorage<T>(key: string, initialValue: T) {

    const [value, setValue] = useState<T>(() => {

        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) {
            try {
                return JSON.parse(jsonValue)

            } catch (error) {
                alert(error)
            }
        }
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])


    return [value, setValue] as [typeof value, typeof setValue]
}
