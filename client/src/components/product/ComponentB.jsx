import productStore from "../../store/ProductStore.js";

const ComponentB = () => {
    const {Slider} = productStore()
    return (
        <div>
            <h1>
                This is component B
            </h1>
            {
                JSON.stringify(Slider)
            }
        </div>
    );
};

export default ComponentB;