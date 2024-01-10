import React from 'react';
import productStore from "../../store/ProductStore.js";
import SliderSkeleton from "../../skeleton/SliderSkeleton.jsx";

const Slider = () => {
    const {sliderList} = productStore()
    if (sliderList===null){
        return <SliderSkeleton/>
    }else {
        return (
            <div>

            </div>
        );
    }

};

export default Slider;