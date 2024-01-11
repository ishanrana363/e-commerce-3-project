import Layout from "../components/layout/Layout.jsx";
import ProductDetails from "../components/product/ProductDetails.jsx";
import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Skeleton from "react-loading-skeleton";

const ProductDetailsPage = () => {
    const {id} = useParams()
    const {DetailsRequest} = productStore()
    useEffect(() => {
        (async ()=>{
            await DetailsRequest(id)
        })()
    }, []);
    return (
        <div>
            <Layout>
                    <ProductDetails/>
            </Layout>
        </div>
    );
};

export default ProductDetailsPage;