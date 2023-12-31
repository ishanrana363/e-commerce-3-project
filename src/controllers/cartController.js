
const {
    cartListService,
    creatCartListService,
    removeCartListService,
    updateCartListService}  =
    require("../services/cartListService")

exports.cartList = async (req,res)=>{
    let result = await cartListService(req);
    res.status(200).json(result)
}

exports.createCartList = async (req,res)=>{
    let result = await creatCartListService(req);
    res.status(201).json(result)
}

exports.removeCartList = async (req,res)=>{
    let result = await removeCartListService(req);
    res.status(201).json(result)
}

exports.updateCartList = async (req,res) =>{
    let result =  await updateCartListService(req);
    res.status(201).json(result)
}


























