import { useCallback, useEffect, useState } from "react"

const useCategories = () => {
    const [categories, setCategories] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/categories");
                const parsedResponse = await response.json()
                setCategories(parsedResponse);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [])

    return { categories, loading, error }
}

export default useCategories