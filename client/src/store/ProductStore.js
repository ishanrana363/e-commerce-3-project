import {create} from "zustand";
import axios from "axios";

const productStore = create((set)=>({
    BrandList : [],
    CategoryList : [],
    Slider : [],
    ByBrandList : [],
    ByCategoryList : [],
    RemarkList : [],
    BySimilerList : [],
    ByKeyWord : [],
    Details : [],
    ReviewList : [],

    BrandListRequest : async () =>{
        let res = await axios.get("/api/v1/productBrandList"); // object literal
        if ( res.data.status ==="success"){
            await set({ BrandList : res?.data?.data })
        }
    },

    CategoryListRequest : async () =>{
        let res = await axios.get("/api/v1/productCategoryList");
        if ( res.data["status"] === "success"){
            set({ CategoryList : res.data["data"] })
        }
    },

    SliderRequest : async () =>{
        let res = await axios.get("/api/v1/productSlider");
        if ( res.data["status"] === "success"){
            set({ Slider : res.data["data"] })
        }
    },

    ByBrandListRequest : async (brandID) =>{
        let res = await axios.get(`/api/v1/productByBrandList/${brandID}`);
        if (res.data["status"] === 'success'){
            set({ByBrandList:res.data["data"]})
        }
    },

    ByCategoryListRequest : async (categoryID) =>{
        let res = await axios.get(`/api/v1/productByCategoryList/${categoryID}`);
        if ( res.data["status"] === "success"){
            set({ ByCategoryList : res.data["data"] })
        }
    },

    RemarkListRequest : async (remark) =>{
        let res = await axios.get(`/api/v1/productRemarkList/${remark}`);
        if ( res.data["status"] === "success"){
            set({ RemarkList : res.data["data"] })
        }
    },

    BySimilerListRequest : async (categoryID) =>{
        let res = await axios.get(`/api/v1/productBySimilerList/${categoryID}`);
        if ( res.data["status"] === "success"){
            set({ BySimilerList : res.data["data"] })
        }
    },


    ByKeyWordRequest : async (keyword) =>{
        let res = await axios.get(`/api/v1/productByKeyWord/${keyword}`);
        if ( res.data["status"] === "success"){
            set({ ByKeyWord : res.data["data"] })
        }
    },

    DetailsRequest : async (productID) =>{
        let res = await axios.get(`/api/v1/productDetails/${productID}`);
        if ( res.data["status"] === "success"){
            set({ Details : res.data["data"] })
        }
    },

    ReviewListRequest : async (productID) =>{
        let res = await axios.get(`/api/v1/productReviewList/${productID}`);
        if ( res.data["status"] === "success"){
            set({ ReviewList : res.data["data"] })
        }
    },


}))


export default productStore;

