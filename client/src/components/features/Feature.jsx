import featureStore from "../../store/FeatureStore.js";
import FeaturesSkeleton from "../../skeleton/FeaturesSkeleton.jsx";

const Feature = () => {
    const {FeatureList} = featureStore()
    if (FeatureList===null){
        return <FeaturesSkeleton/>
    }
    else {
        return (
            <div>

            </div>
        );
    }
};

export default Feature;