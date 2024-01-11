import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import ProductList from "../components/product/ProductList.jsx";
import {useEffect} from "react";

const ProductByBrandListPage = () => {
    const {ListByBrandRequest} = productStore()
    const {id}=useParams()
    useEffect(() => {
        (async ()=>{
            await ListByBrandRequest(id)
        })()
    }, [id]);

    return (
        <div>
            <Layout>
                <ProductList/>
            </Layout>
        </div>
    );
};

export default ProductByBrandListPage;