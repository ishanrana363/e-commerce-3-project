import ProductStore from "../store/ProductStore.js";
import { useEffect, useState } from "react";

const HomePage = () => {
    const { BrandList, BrandListRequest } = ProductStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await BrandListRequest();
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [BrandListRequest]);
    console.log(BrandList)
    return (
        <div>
            <h1>Home</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>{JSON.stringify(BrandList)}</h1>
                    {/* Render your data here */}
                </div>
            )}
        </div>
    );
};

export default HomePage;