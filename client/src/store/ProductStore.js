import {create} from "zustand";
import axios from "axios";


const ProductStore = create((set)=>({
    BrandList : [],
    CategoryList : [],
    Slider : [],
    ByCategoryList :[],
    ByBrandList  : [],
    RemarkList : [],
    BySimilerList : [],
    ByKeyWord : [],
    Details : [],
    ReviewList : [],

    BrandListRequest : async () =>{
        let res = await axios.get("/api/v1/productBrandList")
        console.log(res.data["data"])
        if (res.data["status"]==="success"){
            set({BrandList:  res.data.data})
        }


    },
    CategoryListRequest : async () =>{
        let res = await axios.get("/api/v1/productCategoryList")
        if ( res.data["status"] === "success" ){
            set( { CategoryList : res.data["data"] } )
        }
    },
    SliderRequest : async () =>{
        let res = await axios.get("/api/v1/productSlider");
        if (res.data["status"]==="success"){
            set({ Slider : res.data["data"] })
        }
    },
    ByCategoryListRequest : async (categoryID) =>{
        let res = await axios.get(`/api/v1/productByCategoryList${categoryID}`);
        if ( res.data["status"] === "success" ){
            set({ ByCategoryList : res.data["data"]  })
        }
    },
    ByBrandListRequest : async (brandID) =>{
        let res = await axios.get(`/api/productByBrandList/${brandID}`);
        if ( res.data["status"] === "success"){
            set({ByBrandList: res.data["data"]  })
        }
    },
    RemarkListRequest : async (remark) =>{
        let res = await axios.get(`/productRemarkList/ ${remark}`);
        if (res.data["status"]=== "success"){
            set( { RemarkList : res.data["data"] } )
        }
    },

    BySimilerListRequest : async (categoryID) =>{
        let res = await axios.get(`productBySimilerList/${categoryID}`);
        if (res.data["status"]=== "success"){
            set( { BySimilerList : res.data["data"] } )
        }
    },

    ByKeyWordRequest : async (keyword) =>{
        let res = await axios.get(`/productByKeyWord/${keyword}`);
        if (res.data["status"]=== "success"){
            set( { ByKeyWord : res.data["data"] } )
        }
    },
    DetailsRequest : async (productID) =>{
        let res = await axios.get(`/productDetails/${productID}`);
        if (res.data["status"]=== "success"){
            set( { Details : res.data["data"] } )
        }
    },
    ReviewListRequest : async (productID) =>{
        let res = await axios.get(`productReviewList/ ${productID} `);
        if (res.data["status"]=== "success"){
            set( { ReviewList : res.data["data"] } )
        }
    }


}))

export default ProductStore;