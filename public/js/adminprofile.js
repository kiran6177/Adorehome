
const adminnamebtn = document.getElementById('adminnamebtn')
const adminemailbtn = document.getElementById('adminemailbtn')
const adminmobbtn = document.getElementById('adminmobbtn')
const adminname = document.getElementById('adminname')
const adminemail = document.getElementById('adminemail')
const adminmobile = document.getElementById('adminmobile')
const editbtn = document.getElementById('editprobtn')
const editbtn1 = document.getElementById('editbtn')
const logoutbtn = document.getElementById('logout')


editbtn.addEventListener('click',()=>{
    adminnamebtn.style.display ="none"
    adminname.style.display = "block"
    adminemailbtn.style.display ="none"
    adminemail.style.display = "block"
    adminmobbtn.style.display ="none"
    adminmobile.style.display = "block"
    
    editbtn1.style.display = "block"
})

async function logout()
{
    const res = await fetch('/admin/logout')

    const data = await res.json()

    if(data.data)
    {
        Swal.fire({
            title:data.data,
            icon:"success",
            ConfirmButtonText:"OK"
        })
        .then(res=>{
            if(res.isConfirmed)
            {
                window.location.href = "/admin/login"
            }
        })
    }
}

logoutbtn.addEventListener('click',()=>{
    console.log("hi logout")
    logout()
})