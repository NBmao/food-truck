import { FoodTruck } from "@/interfaces";
import { useEffect, useState } from "react"


const useApi = (url: string) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<FoodTruck[]>();
    const [error, setError] = useState<any>();


    useEffect(() => {

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.body instanceof Array) {
                    const items = data.body.map((record: FoodTruck) => {
                        return { ...record, key: record.objectid }
                    });

                    setData(items);
                } else {
                    setError('api error')
                }
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    return {
        loading,
        data,
        error,
    }

}

export default useApi