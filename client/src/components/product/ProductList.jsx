import productStore from "../../store/ProductStore.js";
import ProductsSkeleton from "../../skeleton/Product-skeleton.jsx";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {useEffect, useState} from "react";
import data from "bootstrap/js/src/dom/data.js";

const ProductList = () => {
    const {ListProduct,ListByFilterRequest,BrandList,BrandListRequest,CategoryList,CategoryListRequest} = productStore()
    const [filter, setFilter] = useState({
        categoryID:"",
        brandID:"",
        maxPrice:"",
        minPrice : ""
    })
    let {categoryID,brandID, maxPrice, minPrice,} = filter;
    const inputOnChange = (name,value) => {
        setFilter((data)=>({
            ...data ,
            [name] : value
        }))
    }
    useEffect(() => {
        (async ()=>{
            BrandList===null?await BrandListRequest():null;
            CategoryList===null?await CategoryListRequest():null;
            let isEmpty = Object.values(filter).every(value => value==="")
            !isEmpty ? await ListByFilterRequest(filter) :null
        })()
    }, [filter]);

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className="card vh-100 p-3 shadow-sm">
                        <label className="form-label mt-3">Brands</label>
                        <select value={brandID} onChange={(e)=>{ inputOnChange("brandID",e.target.value) }} className="form-control form-select">
                            <option value="">Choose Brand</option>
                            {
                                BrandList!==null ? (
                                    BrandList.map((item,i)=>{
                                        return(
                                            <option key={i} value= {item["_id"]} > { item["brandName"] } </option>
                                        )
                                    })
                                ) : (<option></option>)
                            }
                        </select>
                        <label className="form-label mt-3">Categories</label>
                        <select value={categoryID} onChange={(e)=>{ inputOnChange("categoryID",e.target.value) }} className="form-control form-select">
                            <option value="">Choose Category</option>
                            {
                                CategoryList!==null ? (
                                    CategoryList.map((item,i)=>{
                                       return(
                                           <option key={i} value={ item["_id"] } > { item["categoryName"] } </option>
                                       )
                                    })
                                ) : ( <option></option> )
                            }
                        </select>
                        <label className="form-label mt-3">Maximum Price ${maxPrice}</label>
                        <input value={maxPrice} onChange={(e)=>{inputOnChange("maxPrice",e.target.value)}} min={0} max={1000000} step={1000} type="range" className="form-range" />
                        <label className="form-label mt-3">Minimum Price ${minPrice}</label>
                        <input value={minPrice} onChange={(e)=>{ inputOnChange("minPrice",e.target.value) }} min={0} max={1000000} step={1000} type="range" className="form-range" />
                    </div>
                </div>
                <div className="col-md-9 p-2">
                    <div className="container">
                        <div className="row"> {
                            ListProduct === null ? ( <ProductsSkeleton/> ) : (
                                <div className="container">
                                    <div className="row">
                                        {
                                            ListProduct.map((item,i)=>{
                                                let price;
                                                if (item["discount"]){
                                                    price = <p className="bodyMedium  text-dark my-1">Price:<strike> ${item['price']} < /strike> ${item['discountPrice']} </p>
                                                }
                                                return(

                                                    <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                        <Link to= {`/details/${item["_id"]}`} className="card shadow-sm h-100 rounded-3 bg-white">
                                                            <img className="w-100 rounded-top-2" src= { item["image"] } />
                                                            <div className="card-body">
                                                                <p className="bodySmal text-secondary my-1">{ item["title"] }</p>
                                                                <p className="bodyMedium text-dark my-1 "> { price } </p>
                                                                <StarRatings rating={parseFloat(item['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />
                                                            </div>
                                                        </Link>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        } </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;