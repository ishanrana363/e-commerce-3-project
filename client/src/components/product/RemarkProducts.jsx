import productStore from "../../store/ProductStore.js";

const RemarkProducts = () => {
    const {remarkList} = productStore()
    return (
        <div>
            Products
        </div>
    );
};

export default RemarkProducts;