import { useEffect, useState } from "react"

const useUsers = () => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);

                const userChoices = await fetch("http://localhost:3000/userChoices");
                const parsedChoices = await userChoices.json()
                setList(parsedChoices)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [])


    return { list, loading }
}

export default useUsers