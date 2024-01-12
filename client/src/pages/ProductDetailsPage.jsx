import React, {useEffect} from 'react';
import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import ProductDetails from "../components/product/ProductDetails.jsx";
import Brand from "../components/product/Brand.jsx";

const ProductDetailsPage = () => {
    const  {id} =  useParams()
    const {DetailsRequest,ReviewRequest,BrandList,BrandListRequest} = productStore()
    useEffect(() => {
        (async ()=>{
            await DetailsRequest(id)
            await ReviewRequest(id)
            BrandList === null ? await BrandListRequest() : null
        })()
    }, []);
    return (
        <div>

            <Layout>
                <ProductDetails/>
                <Brand/>
            </Layout>
        </div>
    );
};

export default ProductDetailsPage;