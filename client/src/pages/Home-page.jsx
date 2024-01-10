
import Layout from "../components/layout/Layout.jsx";
import Slider from "../components/product/Slider.jsx";
import Feature from "../components/features/Feature.jsx";
import RemarkProducts from "../components/product/RemarkProducts.jsx";
import Categories from "../components/product/Categories.jsx";
import Brand from "../components/product/Brand.jsx";
import productStore from "../store/ProductStore.js";
import featureStore from "../store/FeatureStore.js";
import {useEffect} from "react";


const HomePage = () => {
    const {BrandListRequest,CategoryListRequest,SliderRequest,RemarkListRequest} = productStore()
    const {FeatureListRequest} = featureStore()
    useEffect(() => {
        (async ()=>{
            await SliderRequest();
            await FeatureListRequest();
            await CategoryListRequest();
            await RemarkListRequest("new");
            await BrandListRequest()
        }) ()
    }, []);
    return (
        <div>
            <Layout>
                <Slider/>
                <Feature/>
                <Categories/>
                <RemarkProducts/>
                <Brand/>
            </Layout>
        </div>
    );
};

export default HomePage;