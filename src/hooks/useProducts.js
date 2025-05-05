import { useCallback, useEffect, useState } from "react";
import { recomendationService } from "../recommendation.service";

const useProducts = () => {
    const [recommendedProducts, setRecommendedProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()

    const getUserRecommendations = useCallback(async (id) => {
        const baseURL = "http://localhost:3000/userChoices"
        const userURL = id ? `${baseURL}/${id}` : baseURL;
        try {
            setLoading(true);

            const response = await fetch("http://localhost:3000/products");
            const parsedProducts = await response.json()

            const userChoices = await fetch(userURL);
            const parsedChoices = await userChoices.json()

            const categories = id
                ? parsedChoices?.categories
                : parsedChoices?.[0]?.categories;

            const recomendations = await recomendationService(parsedProducts, categories)
            setRecommendedProducts(recomendations)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        getUserRecommendations()
    }, [getUserRecommendations]);



    return { recommendedProducts, loading, error, getUserRecommendations };
};

export default useProducts;
