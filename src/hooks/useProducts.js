import { useEffect, useState } from "react";
import { recomendationService } from "../recommendation.service";

const useProducts = () => {
    const [recommendedProducts, setRecommendedProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "http://localhost:3000/products"
                );
                const parsedProducts = await response.json()
                const userChoices = await fetch("http://localhost:3000/userChoices");
                const parsedChoices = await userChoices.json()
                const recomendations = await recomendationService(parsedProducts, parsedChoices[0].categories)
                setRecommendedProducts(recomendations)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    return { recommendedProducts, loading, error };
};

export default useProducts;
