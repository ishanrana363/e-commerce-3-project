
 const {    
     productCategoryListService,
    productBrandListService,
    productSliderService,
    productByCategoryListService,
    productByBrandListService,
    productBySimilerListService,
     ListByKeywordService,
    productDetailsService,
    productRemarkListService,
    productReviewListService,
     productCreateReviewService
} = 
    require("../services/productListService") 

// Product Category List Controller

exports.productCategoryList = async (req,res)=>{
    let result = await productCategoryListService(req);
    res.status(200).json(result)
    console.log(result)
}

// product brandlist controller

exports.productBrandList = async (req,res)=>{
    let result = await productBrandListService(req)
    res.status(200).json(result)
}

// Product  Slider Controller

exports.productSlider = async (req,res) =>{
    let result = await productSliderService();
    res.status(200).json(result)
}

// Product By Category List Controller

exports.productByCategoryList = async (req,res)=>{
    let result = await productByCategoryListService(req);
    res.status(200).json(result)
}

// product By BrandList Controller

exports.productByBrandList = async (req,res) =>{
    let result = await productByBrandListService(req);
    res.status(200).json(result)
}

// product remark controller

exports.productRemarkList = async (req,res) =>{
    let result = await productRemarkListService(req);
    res.status(200).json(result)
}

exports.productBySimilerList = async (req,res) =>{
    let result = await productBySimilerListService(req);
    res.status(200).json(result)
}

exports.productByKeyWord = async (req,res) =>{
    let result = await ListByKeywordService(req);
    res.status(200).json(result)
}

exports.productDetails = async (req,res)=>{
    let result = await productDetailsService(req);
    res.status(200).json(result)
}


exports.productReviewList = async (req,res)=>{
    let result = await productReviewListService(req);
    res.status(200).json(result)
}

exports.productCreateReviewController = async (req,res) =>{
    let result = await productCreateReviewService(req);
    res.status(201).json(result)
}