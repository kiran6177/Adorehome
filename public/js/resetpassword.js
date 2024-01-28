const newpassword = document.getElementById('newpassword')
const confirmpassword = document.getElementById('confirmpassword')
const resetform = document.getElementById('resetform')
const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')


console.log("Resert")

function pass(pwd)
{   const passpattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/
    if(pwd.trim()==="")
    {
        error1.innerHTML = "Please Enter Password."
        error1.style.display = "block"
    }
    else if(!passpattern.test(pwd))
    {
        error1.innerHTML = "Password should only include Numbers and Alphabets."
        error1.style.display = "block"
    }
    else if(pwd.length < 8)
    {
        error1.innerHTML = "Please Enter Atleast 8 characters"
        error1.style.display = "block"
    }
    else{
        error1.innerHTML = ""
        error1.style.display = "none"

    }
}

function pass1(pwd)
{   const passpattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/
    if(pwd.trim()==="")
    {
        error2.innerHTML = "Please Enter Password."
        error2.style.display = "block"
    }
    else if(!passpattern.test(pwd))
    {
        error2.innerHTML = "Password should only include Numbers and Alphabets."
        error2.style.display = "block"
    }
    else if(pwd.length < 8)
    {
        error2.innerHTML = "Please Enter Atleast 8 characters"
        error2.style.display = "block"
    }
    else{
        error2.innerHTML = ""
        error2.style.display = "none"

    }
}


newpassword.addEventListener('keyup',()=>{
    const passdata = newpassword.value
    pass(passdata)
})
newpassword.addEventListener('blur',()=>{
    const passdata = newpassword.value
    pass(passdata)
})
confirmpassword.addEventListener('keyup',()=>{
    const passdata = confirmpassword.value
    pass1(passdata)
})
confirmpassword.addEventListener('blur',()=>{
    const passdata = confirmpassword.value
    pass1(passdata)
})

resetform.addEventListener('submit',(event)=>{
    const passdata = newpassword.value
    pass(passdata)
    const passdata1 = confirmpassword.value
    pass1(passdata1)
    if(error2.innerHTML == ""){
    if(passdata !== passdata1){
        error2.innerHTML = "Password mismatch."
        error2.style.display = 'block'
    }
    else{
        error2.innerHTML = ""
        error2.style.display = "none"
    }
    }
    if(error1.innerHTML !== "" || error2.innerHTML !== "" )
    {
        event.preventDefault()
    }
})