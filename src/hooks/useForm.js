import { useCallback, useState } from "react";

const useForm = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()

    const save = useCallback(async ({ categories, name }) => {
        const body = JSON.stringify({
            categories, name
        })
        try {
            const response = await fetch("http://localhost:3000/userChoices", { method: "POST", body });
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [])
    return { save, loading, error }
}

export default useForm