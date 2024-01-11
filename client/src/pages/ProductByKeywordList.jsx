import React, {useEffect} from 'react';
import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import ProductList from "../components/product/ProductList.jsx";

const ProductByKeywordList = () => {
    const {ByKeyWordRequest}=productStore();
    const {keyword} = useParams();
    useEffect(() => {
        (async ()=>{
            await ByKeyWordRequest(keyword)
        })()
    }, [keyword]);

    return (
        <div>
            <Layout>
                <ProductList/>
            </Layout>
        </div>
    );
};

export default ProductByKeywordList;