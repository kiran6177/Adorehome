const jwttoken = require('../utils/jwt')

const isLogin = async (req,res,next)=>{
    if(req.cookies.token)
    {   
        const decoded = await jwttoken.verifytoken(req.cookies.token)
        // console.log(decoded)
        if(decoded)
        {
            req.userid = decoded._id
            next()
        }
        else{
            res.redirect("/login")
        }

    }
    else{
        res.redirect('/login')
    }
}

const isLogout =async (req,res,next)=>{
    if(req.cookies.token != undefined)
    {   
        const decoded =await jwttoken.verifytoken(req.cookies.token)
        console.log(decoded)
        if(decoded)
        {
            req.userid = decoded._id
            res.redirect("/home")
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