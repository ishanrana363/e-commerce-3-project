import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Layout from "../components/layout/Layout.jsx";
import ProductList from "../components/product/ProductList.jsx";


const ProductByCategoryList = () => {
    const {ListByCategoryRequest} =  productStore();
    const {id} = useParams()
    useEffect(() => {
        (async ()=>{
            await ListByCategoryRequest(id)
        }) ()
    }, []);
    return (
        <div>
            <Layout>
                <ProductList/>
            </Layout>
        </div>
    );
};

export default ProductByCategoryList;