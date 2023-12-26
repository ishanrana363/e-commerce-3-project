
const {createInvoiceService} = require("../services/invoiceService")

exports.crateInvoice = async (req,res) => {
    let result = await createInvoiceService(req);
    res.status(200).json(result)
}