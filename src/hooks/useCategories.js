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

    const save = useCallback(async (categories) => {
        const body = JSON.stringify({
            categories
        })
        try {
            const response = await fetch("http://localhost:3000/userChoices", { method: "POST", body });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [])

    return { categories, loading, error, save }
}

export default useCategories