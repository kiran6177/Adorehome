const error1 = document.getElementById('fnameerror')
const error2 = document.getElementById('lnameerror')
const error3 = document.getElementById('emailerror')
const error4 = document.getElementById('moberror')
const fname = document.getElementById('firstname')
const lname = document.getElementById('lastname')
const email = document.getElementById('email')
const mobile = document.getElementById('mobile')
const editform = document.getElementById('editprofile')

function fnamevalidate(name)
{   
    const namepattern = /^[a-zA-Z]+$/
    if(name.trim()==="")
    {
        error1.innerHTML = "Please Enter Firstname."
        error1.style.display = "block"
    }
    else if(!namepattern.test(name))
    {
        error1.innerHTML = "Name should only include Alphabets."
        error1.style.display = "block"
    }
    else{
        error1.innerHTML = ""
        error1.style.display = "none"
    }
}

function lnamevalidate(name)
{   
    const namepattern = /^[a-z A-Z]+$/
    if(name.trim()==="")
    {
        error2.innerHTML = "Please Enter Lastname."
        error2.style.display = "block"
    }
    else if(!namepattern.test(name))
    {
        error2.innerHTML = "Name should only include Alphabets."
        error2.style.display = "block"
    }
    else{
        error2.innerHTML = ""
        error2.style.display = "none"
    }
}





function emailfunc(emaild)
{
    const emailpattern = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,4})$/
    if(emaild.trim()==="")
    {   
        error3.innerHTML = "Please Enter Email."
        error3.style.display = "block"
    }
    else if(!emailpattern.test(emaild))
    {
        error3.innerHTML = "Invalid Format !!"
        error3.style.display = "block"
    }
    else{
        error3.innerHTML = ""
        error3.style.display = "none"
    }
}


function mobvalidate(mob)
{
    const mobpattern = /^\d+$/
    if(mob.trim()==="")
    {
        error4.innerHTML = "Please Enter Mobile Number."
        error4.style.display = "block"
    }
    else if(!mobpattern.test(mob))
    {
        error4.innerHTML = "Please Enter Digits."
        error4.style.display = "block"
    }
    else if(mob.length!== 10)
    {
        error4.innerHTML = "Please Enter Atleast 10 Digits."
        error4.style.display = "block"
    }
    else{
        error4.innerHTML = ""
        error4.style.display = "none"
    }
}

fname.addEventListener('keyup',()=>{
    const fdata = fname.value
    fnamevalidate(fdata)
})
fname.addEventListener('blur',()=>{
    const fdata = fname.value
    fnamevalidate(fdata)
})

lname.addEventListener('keyup',()=>{
    const ldata = lname.value
    lnamevalidate(ldata)
})
lname.addEventListener('blur',()=>{
    const ldata = lname.value
    lnamevalidate(ldata)
})



email.addEventListener('keyup',()=>{
    const emaildata = email.value
    emailfunc(emaildata)
})
email.addEventListener('blur',()=>{
    const emaildata = email.value
    emailfunc(emaildata)
})


mobile.addEventListener('keyup',()=>{
    const mdata = mobile.value
    mobvalidate(mdata)
})
mobile.addEventListener('blur',()=>{
    const mdata = mobile.value
    mobvalidate(mdata)
})

editform.addEventListener('submit',(event)=>{
    const emaildata = email.value
    const ldata = lname.value
    const fdata = fname.value
    const mdata = mobile.value
    
    mobvalidate(mdata)
    fnamevalidate(fdata)
    lnamevalidate(ldata)
    emailfunc(emaildata)



    if(error1.innerHTML !== "" || error2.innerHTML !== "" || error3.innerHTML !== "" || error4.innerHTML !== "" )
    {
        event.preventDefault()
    }
})