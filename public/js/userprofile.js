const logoubtn = document.getElementById('logoutbtn')


async function logOut()
{
    try{
    const res = await fetch('/logout')
    const data = await res.json()
    if(data.data)
    {
        Swal.fire(
            {
                title: data.data,
                icon: "success",
                confirmButtonText:"OK"
                })
                .then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.reload()
                    }
                    
            })  
        
    }}
    catch(err)
    {
        window.location.href = '/login'
    }
}

logoubtn.addEventListener('click',()=>{
   
    logOut()
})