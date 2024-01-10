import productStore from "../../store/ProductStore.js";
import BrandsSkeleton from "../../skeleton/BrandsSkeleton.jsx";


const Brand = () => {
    const {brandList} = productStore();
    if (brandList===null){
        return <BrandsSkeleton/>
    }
    else {
        return (
            <div>
                Brand
            </div>
        );
    }

};

export default Brand;