import {create} from "zustand";


const useStore = create(()=>({
    CategoryList : [],
    BrandList : [],
    Slider : [],
    ByCategoryList :[],
    ByBrandList  : [],
    RemarkList : []
}))