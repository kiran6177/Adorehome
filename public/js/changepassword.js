const pass1error = document.getElementById('pass1error')
const pass2error = document.getElementById('pass2error')
const confirmpasserror = document.getElementById('confirmpasserror')
const passwordform = document.getElementById('changepassword')
const oldpassword = document.getElementById('oldpassword')
const newpassword = document.getElementById('newpassword')
const confirmpassword = document.getElementById('confirmpassword')


function oldpassfunc(pwd)
{   const passpattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/
    if(pwd.trim()==="")
    {
        pass1error.innerHTML = "Please Enter your old Password."
        pass1error.style.display = "block"
    }
    else if(!passpattern.test(pwd))
    {
        pass1error.innerHTML = "Password should only include Numbers and Alphabets."
        pass1error.style.display = "block"
    }
    else if(pwd.length < 8)
    {
        pass1error.innerHTML = "Please Enter Atleast 8 characters"
        pass1error.style.display = "block"
    }
    else{
        pass1error.innerHTML = ""
        pass1error.style.display = "none"

    }
}

function newpassfunc(pwd)
{   const passpattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/
    if(pwd.trim()==="")
    {
        pass2error.innerHTML = "Please Enter your old Password."
        pass2error.style.display = "block"
    }
    else if(!passpattern.test(pwd))
    {
        pass2error.innerHTML = "Password should only include Numbers and Alphabets."
        pass2error.style.display = "block"
    }
    else if(pwd.length < 8)
    {
        pass2error.innerHTML = "Please Enter Atleast 8 characters"
        pass2error.style.display = "block"
    }
    else{
        pass2error.innerHTML = ""
        pass2error.style.display = "none"

    }
}



function confirmpassfunc(pwd)
{   const passpattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/
    if(pwd.trim()==="")
    {
        confirmpasserror.innerHTML = "Please Enter your old Password."
        confirmpasserror.style.display = "block"
    }
    else if(!passpattern.test(pwd))
    {
        confirmpasserror.innerHTML = "Password should only include Numbers and Alphabets."
        confirmpasserror.style.display = "block"
    }
    else if(pwd.length < 8)
    {
        confirmpasserror.innerHTML = "Please Enter Atleast 8 characters"
        confirmpasserror.style.display = "block"
    }
    else{
        confirmpasserror.innerHTML = ""
        confirmpasserror.style.display = "none"

    }
}


oldpassword.addEventListener('blur',()=>{
    const passdata = oldpassword.value
    oldpassfunc(passdata)
})
oldpassword.addEventListener('keyup',()=>{
    const passdata = oldpassword.value
    oldpassfunc(passdata)
})

newpassword.addEventListener('blur',()=>{
    const passdata = newpassword.value
    newpassfunc(passdata)
})
newpassword.addEventListener('keyup',()=>{
    const passdata = newpassword.value
    newpassfunc(passdata)
})

confirmpassword.addEventListener('blur',()=>{
    const passdata = confirmpassword.value
    confirmpassfunc(passdata)
})
confirmpassword.addEventListener('keyup',()=>{
    const passdata = confirmpassword.value
    confirmpassfunc(passdata)
})

passwordform.addEventListener('submit',(e)=>{
    const passdata = oldpassword.value
    const passdata1 = newpassword.value
    const passdata2 = confirmpassword.value

    confirmpassfunc(passdata2)
    newpassfunc(passdata1)
    oldpassfunc(passdata)

    if(pass1error.innerHTML!=="" || pass2error.innerHTML!=="" || confirmpasserror.innerHTML!=="" )
    {
        e.preventDefault()
    }
})