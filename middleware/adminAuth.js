const jwttoken = require('../utils/jwt')

const isLogin = async (req,res,next)=>{
    if(req.cookies.admintoken)
    {   
        const decoded = await jwttoken.verifytoken(req.cookies.admintoken)
        // console.log(decoded)
        if(decoded)
        {
            req.adminid = decoded.id
            next()
        }
        else{
            res.redirect("/admin/login")
        }

    }
    else{
        res.redirect('/admin/login')
    }
}

const isLogout =async (req,res,next)=>{
    if(req.cookies.admintoken != undefined)
    {   
        const decoded =await jwttoken.verifytoken(req.cookies.admintoken)
        console.log(decoded)
        if(decoded)
        {
            req.adminid = decoded.id
            res.redirect("/admin/home")
        }
        else{
            // console.log("error in authentication")
            next()
        }
    }
    else{
        next()
    }
}



module.exports = {
    isLogin,
    isLogout
}