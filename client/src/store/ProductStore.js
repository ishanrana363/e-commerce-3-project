import {create} from "zustand";
import axios from "axios";

const productStore = create((set)=>({





    BrandList :null,
    BrandListRequest : async () =>{
        set({BrandList:null})
        let res = await axios.get("/api/v1/productBrandList"); // object literal
        if ( res.data.status ==="success"){
            await set({ BrandList : res?.data?.data })
        }
    },

    CategoryList : null,
    CategoryListRequest : async () =>{
        set({CategoryList:null})
        let res = await axios.get("/api/v1/productCategoryList");
        if ( res.data["status"] === "success"){
            set({ CategoryList : res.data["data"] })
        }
    },

    SliderList : null ,
    SliderRequest : async () =>{
        set({SliderList:null})
        let res = await axios.get("/api/v1/productSlider");
        if ( res.data["status"] === "success"){
            set({ SliderList : res.data["data"] })
        }
    },

    RemarkList : null,
    RemarkListRequest : async (remark) =>{
        let res = await axios.get(`/api/v1/productRemarkList/${remark}`);
        if ( res.data["status"] === "success"){
            set({ RemarkList : res.data["data"] })
        }
    },


    ByKeyWord : [],
    ByKeyWordRequest : async (keyword) =>{
        let res = await axios.get(`/api/v1/productByKeyWord/${keyword}`);
        if ( res.data["status"] === "success"){
            set({ ByKeyWord : res.data["data"] })
        }
    },




}))


export default productStore;