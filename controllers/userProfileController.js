const User = require('../models/userSchema')

const profileLoad = async (req,res)=>{
    try {
        const uid = req.userid
        const udata = await User.findById({_id:uid}).populate('cart.product_id')
        if(udata.length !=0)
        {
            // console.log(udata)
        res.render('user/userprofile',{udata:udata})
        }
        else{
            console.log("error in profilerender")
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    profileLoad
}