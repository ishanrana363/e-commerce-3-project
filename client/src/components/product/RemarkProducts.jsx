import productStore from "../../store/ProductStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import {Link} from "react-router-dom";
import ProductSkeleton from "../../skeleton/Product-skeleton.jsx";
import ProductsSkeleton from "../../skeleton/Product-skeleton.jsx";

const RemarkProducts = () => {
    const {RemarkList,RemarkListRequest} = productStore()
    return (
        <div>
            <div className="section">
                <div className="container-fluid py-5 bg-light">
                    <div className="row">
                        <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
                        <span className="bodySmal mb-3 text-center">Explore a World of Choices Across Our Most Popular</span>
                        <div className="col-12">
                            <div>
                                <ul className="nav nav-pills p-3 justify-content-center mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=>{RemarkListRequest("new")}} className="nav-link active" id="pills-home-tab" data-bstoggle="pill"
                                                data-bs-target="#pills-new" type="button" role="tab" aria-controls="pills-home" ariaselected="true">New</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=>{RemarkListRequest("trending")}} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-trending" type="button" role="tab" aria-controls="pills-profile" ariaselected="false">Trending</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=>{RemarkListRequest("popular")}} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-popular" type="button" role="tab" aria-controls="pills-contact" ariaselected="false">Popular</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=>{RemarkListRequest("top")}} className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-top" type="button" role="tab" aria-controls="pills-disabled" ariaselected="false">Top</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={()=>{RemarkListRequest("special")}} className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-special" type="button" role="tab" aria-controls="pills-disabled" ariaselected="false">Special</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-new" role="tabpanel" arialabelledby="pills-home-tab" tabIndex="0">
                                        {
                                            RemarkList === null ? ( <ProductsSkeleton/> ) : (
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            RemarkList.map((item,i)=>{
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
                                        }

                                    </div>
                                    <div className="tab-pane fade" id="pills-trending" role="tabpanel" aria-labelledby="pillsprofile-tab" tabIndex="0">
                                        {
                                            RemarkList === null ? ( <ProductsSkeleton/> ) : (
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            RemarkList.map((item,i)=>{
                                                                let price;
                                                                if (item["discount"]){
                                                                    price = <p className="bodyMedium  text-dark my-1">Price:<strike> ${item['price']} < /strike> ${item['discountPrice']} </p>
                                                                }
                                                                return(
                                                                    <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                                        <Link to="" className="card shadow-sm h-100 rounded-3 bg-white">
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
                                        }
                                    </div>
                                    <div className="tab-pane fade" id="pills-popular" role="tabpanel" aria-labelledby="pillscontact-tab" tabIndex="0">
                                        {
                                            RemarkList === null ? ( <ProductsSkeleton/> ) : (
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            RemarkList.map((item,i)=>{
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
                                        }
                                    </div>
                                    <div className="tab-pane fade" id="pills-top" role="tabpanel" aria-labelledby="pills-disabledtab" tabIndex="0">
                                        {
                                            RemarkList === null ? ( <ProductsSkeleton/> ) : (
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            RemarkList.map((item,i)=>{
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
                                        }
                                    </div>
                                    <div className="tab-pane fade" id="pills-special" role="tabpanel" aria-labelledby="pillsdisabled-tab" tabIndex="0">
                                        {
                                            RemarkList === null ? ( <ProductsSkeleton/> ) : (
                                                <div className="container">
                                                    <div className="row">
                                                        {
                                                            RemarkList.map((item,i)=>{
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
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default RemarkProducts;