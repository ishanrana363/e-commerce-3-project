
const {wishListService,
    wishListSaveService,removeWishListService} =
    require("../services/wishListService")

exports.wishController=async (req,res) =>{
    let result = await wishListService(req);
    res.status(200).json(result)
}

exports.saveWishController=async (req,res) =>{
    let result = await wishListSaveService(req);
    res.status(200).json(result)
}

exports.removeWishController = async (req,res) =>{
    let result = await  removeWishListService(req)
    res.status(200).json(result)
}