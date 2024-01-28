const nodemailer = require('nodemailer')
const Email = process.env.EMAIL
const Password = process.env.PASSWORD

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:Email,
        pass:Password
    }
})

async function sendForgotmail(email,link){
    try{
        let message = {
            from:Email,
            to:email,
            subject:"Adorehome Reset Password.",
            text:"To change your Password, click on the link below.",
            html:`<h5>To change your Password, click on the link below.</h5><br><a href=${link}>Click Here.</a>`
        }
    
        const mailed = await transporter.sendMail(message)
        if(mailed != null)
        {   console.log("forgot mail sent successfully")
            return true
        }
        else{
            console.log(mailed)
            return false
        }
    }
    catch(err)
    {
        console.log(err.message)
    }
    }
    
    module.exports = {sendForgotmail}