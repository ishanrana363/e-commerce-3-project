import React from 'react';
import productStore from "../../store/ProductStore.js";
import CategoriesSkeleton from "../../skeleton/Categories-skeleton.jsx";
const Categories = () => {
    const {CategoryList} = productStore();
    if (CategoryList===null){
        return <CategoriesSkeleton/>
    }else {
        return (
            <div>

            </div>
        );
    }


};

export default Categories;