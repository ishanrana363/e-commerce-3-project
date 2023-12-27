
const {createInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService} =
    require("../services/invoiceService")


exports.crateInvoice = async (req,res) => {
    let result = await createInvoiceService(req);
    res.status(200).json(result)
}

exports.paymentFailController = async (req,res) => {
    let result = await PaymentFailService(req);
    res.status(200).json(result)
}


exports.paymentCancelController = async (req,res) => {
    let result = await PaymentCancelService(req);
    res.status(200).json(result)
}


exports.paymentIpnController = async (req,res) => {
    let result = await PaymentIPNService(req);
    res.status(200).json(result)
}

exports.paymentSuccessfulController = async (req,res) => {
    let result = await PaymentSuccessService(req);
    res.status(200).json(result)
}




















