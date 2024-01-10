
import {create} from "zustand";
import axios from "axios";

const productStore = create((set)=>({
    brandList : null,
    productBrandListRequest : async () =>{
        let res = await axios.get(`/api/v1/productBrandList`);
        if (res.data["status" === "success" ]){
            set({ brandList : res.data["data"] })
        }
    },
    categoryList : null,
    categoryListRequest : async () =>{
        let res = await axios.get(`/api/v1/productCategoryList`);
        if (res.data["status" === "success" ]){
            set({ categoryList : res.data["data"] })
        }
    },
    sliderList : null,
    sliderListRequest : async () =>{
        let res = await axios.get(`/api/v1/productSlider`);
        if (res.data["status" === "success" ]){
            set({ sliderList : res.data["data"] })
        }
    },
    remarkList : null,
    remarkListRequest : async (remark) =>{
        let res = await axios.get(`/api/v1/productRemarkList/${remark}`);
        if (res.data["status" === "success" ]){
            set({ remarkList : res.data["data"] })
        }
    },

    byKeywordList : [],
    byKeywordListRequest : async (keyword) =>{
        let res = await axios.get(`/api/v1/productByKeyWord/${keyword}`);
        if (res.data["status" === "success" ]){
            set({ byKeywordList : res.data["data"] })
        }
    },

}))


export default productStore;