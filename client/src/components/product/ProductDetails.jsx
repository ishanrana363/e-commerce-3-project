import React from 'react';
import productStore from "../../store/ProductStore.js";
import DetailsSkleton from "../../skeleton/DetailsSkleton.jsx";
const ProductDetails = () => {
    const {Details} = productStore()
    if (Details===null){
        return <DetailsSkleton/>
    }else {
        return (
            <div>


            </div>
        );
    }


};

export default ProductDetails;