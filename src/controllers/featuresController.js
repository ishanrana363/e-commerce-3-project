const {featureListService}
    =
    require("../services/featureService")


exports.featureListController = async (req,res)=>{
    let result = await featureListService();
    res.status(200).json(result)
}