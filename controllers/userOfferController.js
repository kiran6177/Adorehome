const Offer = require('../models/offerSchema')

const loadOffer = async (req,res)=>{
    try {
        const offerdata = await Offer.aggregate([{$match:{status:"1"}}])
        console.log(offerdata)
        res.render('user/offers',{offer:offerdata})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadOffer
}