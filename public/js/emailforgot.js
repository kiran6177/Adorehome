const email = document.getElementById('email')
const forgotform = document.getElementById('forgotform')

function emailfunc(emaild)
{
    const emailpattern = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,4})$/
    if(emaild.trim()==="")
    {   
        error1.innerHTML = "Please Enter Email."
        error1.style.display = "block"
    }
    else if(!emailpattern.test(emaild))
    {
        error1.innerHTML = "Invalid Format !!"
        error1.style.display = "block"
    }
    else{
        error1.innerHTML = ""
        error1.style.display = "none"
    }
}

email.addEventListener('keyup',()=>{
    const emaildata = email.value
    emailfunc(emaildata)
})
email.addEventListener('blur',()=>{
    const emaildata = email.value
    emailfunc(emaildata)
})

forgotform.addEventListener('submit',(event)=>{
    const emaildata = email.value
    emailfunc(emaildata)

    if(error1.innerHTML !== "" )
    {
        event.preventDefault()
    }
})