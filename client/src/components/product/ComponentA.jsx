import productStore from "../../store/ProductStore.js";
import {useEffect} from "react";

const ComponentA = () => {
    const { SliderRequest } = productStore()
    useEffect(() => {
        (async ()=>{
            await SliderRequest()
        })()
    }, []);
    return (
        <div>
            <h1>
                Component A
            </h1>
        </div>
    );
};

export default ComponentA;