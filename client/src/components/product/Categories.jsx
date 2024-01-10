import React from 'react';
import productStore from "../../store/ProductStore.js";
import CategoriesSkeleton from "../../skeleton/Categories-skeleton.jsx";
import {Link} from "react-router-dom";
const Categories = () => {
    const {CategoryList} = productStore();
    if (CategoryList===null){
        return <CategoriesSkeleton/>
    }else {
        return (
            <div>
                <div className= "section" >
                    <div className= "container" >
                        <div className= "row" >
                            <h1 className= "headline-4 text-center p-0 " > Top Categories </h1>
                            <span className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br
                            />Shopping Categories </span>
                            {
                                CategoryList.map((item,i)=>{
                                    return(
                                        <div key={i} className= "col-6 col-lg-8r col-md-8r text-center p-2 " >
                                             <Link to={`/by-category/${ item["_id"] }`  } className= 'card bg-white rounded-3 h-100 '   >
                                                 <div className= "card-body" >
                                                     <img alt= "img" src={ item["categoryImg"] } className= " w-75 " />
                                                     <p className= "bodySmal mt-3 " >
                                                         {
                                                             item["categoryName"]
                                                         }
                                                     </p>
                                                 </div>
                                             </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }


};

export default Categories;