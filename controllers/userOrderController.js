const User = require('../models/userSchema')
const Order = require('../models/orderSchema')
const Product = require('../models/productSchema')
const { ObjectId } = require('mongodb')
const easyinvoice = require('easyinvoice');
const fs = require('fs')
const path = require('path')

const loadOrdered = async (req,res)=>{
    try {
        const uid = req.userid
        const orderid = req.query.id
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const orderdata = await Order.findById({_id:orderid}).populate('products.product_id')
        if(orderdata!= null)
        {
        res.render('user/ordered',{udata:udata,orderdata:orderdata})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadOrders = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const orderdata = await Order.find({user_id:uid,payment_status:"Paid"}).populate('products.product_id').sort({date:'desc'})
        console.log(orderdata[0].date)
        if(orderdata.length > 0)
        {
        res.render('user/orders',{udata:udata,orderdata:orderdata})
        }
        else{
        res.render('user/orders',{err:"No Orders Added!!"})

        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadSummary = async (req,res)=>{
    try {
        const uid = req.userid
        const orderid = req.query.id
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        const orderdata = await Order.findById({_id:orderid}).populate('products.product_id address_id')
        console.log(orderdata.address_id)
        if(orderdata!= null)
        {
        res.render("user/ordersummary",{udata:udata,orderdata:orderdata})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const cancelOrder = async (req,res)=>{
    try {
        const {oid,pid} = req.query
        console.log(oid,pid)
        const cancelData = await Order.findOneAndUpdate({_id:oid},{$pull:{products:{product_id:pid}}})
        console.log(cancelData)
        if(cancelData!=null)
        {   console.log(cancelData)
            let qtytoupdate = 0
            cancelData.products.forEach(el=>{
                if(el.product_id == pid)
                {   console.log(el.qty)
                    qtytoupdate = el.qty
                }
            })
            console.log(qtytoupdate)
            if(cancelData.products.length <= 1)
            {
                const orderDelete = await Order.findByIdAndDelete({_id:oid})
            }
            else{
                const amountUpdate = await Order.findById({_id:oid}).populate('products.product_id')
                console.log(amountUpdate)
                let totalarray = []
                for(let i = 0;i < amountUpdate.products.length ; i++)
                {
                    const totvalue = amountUpdate.products[i].product_id.price * amountUpdate.products[i].qty
                    totalarray.push(totvalue)
                }
            
                const totamount = totalarray.reduce((acc,curr)=>acc+curr)
                console.log(totamount)
                const UpdateTotal = await Order.findByIdAndUpdate({_id:oid},{$set:{total_amount:totamount}})
            }

            const stockUpdate = await Product.findByIdAndUpdate({_id:pid},{$inc:{stock:qtytoupdate}})
                if(stockUpdate!=null)
                {
                res.json({data:"Order Cancelled!!"})
                }
                else{
                res.json({err:"Cannot Cancel Order!!"})
                }                 
            
        }
        else{
            res.json({err:"Cannot Cancel Order!!"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const cancelOrderPayment = async (req,res)=>{
    try {
        const {oid} = req.query
        console.log(oid)
        const cancelData = await Order.findOneAndDelete({_id:oid})
        console.log(cancelData)
        if(cancelData!=null)
        {   console.log(cancelData)
            let prodettoupdate = []
            cancelData.products.forEach(el=>{
                   let qtytoupdate = {
                        product_id:el.product_id,
                        qty:el.qty
                    }
                    prodettoupdate.push(qtytoupdate)
            })
            console.log(prodettoupdate)
            let stockUpdate = []
            prodettoupdate.forEach(async (element)=>{
                 updateData = await Product.findByIdAndUpdate({_id:element.product_id},{$inc:{stock:element.qty}})
                stockUpdate.push(updateData)
            })
            
                if(stockUpdate!=null)
                {
                res.json({data:"Order Cancelled due to Payment Failure!!"})
                }
                else{
                res.json({err:"Cannot Cancel Order!!"})
                }                 
            
        }
        else{
            res.json({err:"Cannot Cancel Order!!"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const generateInvoice = async (req,res)=>{
    try {
        const {id} = req.query
        const orderdata = await Order.aggregate([{$match:{_id:new ObjectId(id)}},{$unwind:'$products'},{$project:{_id:0,products:1,date:1}},{$lookup:{from:'products',localField:'products.product_id',foreignField:'_id',as:'productdetails'}},{$unwind:'$productdetails'}])
        const currentdate = orderdata[0].date.toUTCString().split(' ').slice(1,4).join(' ')
        console.log(currentdate)
        let products = []
        orderdata.forEach(el=>{

            products.push({
                "quantity":el.products.qty,
                "description":el.productdetails.productname,
                "tax-rate":0,
                "price":el.productdetails.price
            })
        })
        console.log(products)
        const data = {
            "images": {
              "logo": fs.readFileSync(path.join(__dirname,'../public/images/LOGO Black.png'), 'base64')
            },
            "sender": {
              "company": "Sample Corp",
              "address": "Sample Street 123",
              "zip": "1234 AB",
              "city": "Sampletown",
              "country": "Samplecountry"
            },
            "client": {
              "company": "Client Corp",
              "address": "Clientstreet 456",
              "zip": "4567 CD",
              "city": "Clientcity",
              "country": "Clientcountry"
            },
            "information": {
              "number": "2022.0001",
              "date": currentdate,
              
            },
            "products": products,
            "bottom-notice": "Thank You for your purchase.",
            "settings": {
              "currency": "INR",
              "tax-notation": "vat",
              "margin-top": 50,
              "margin-right": 50,
              "margin-left": 50,
              "margin-bottom": 25
            }
          }
          const result = await easyinvoice.createInvoice(data)
        //   console.log(result.pdf)
        //   await fs.writeFileSync(path.join(__dirname,'../assets/pdf',"invoice.pdf"),result.pdf,'base64')
        
          res.json({pdfData:result.pdf})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadOrdered,
    loadOrders,
    loadSummary,
    cancelOrder,
    cancelOrderPayment,
    generateInvoice
}