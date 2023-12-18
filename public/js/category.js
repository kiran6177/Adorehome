const catname = document.getElementById("catname")
const status = document.getElementById("status")
const image = document.getElementById('image')
const addcatbtn = document.getElementById('addcatbtn')


function catfetch(data)
{
    fetch("http://localhost:3003/admin/category",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then((res)=>{
        return res.json()
    }).then((data)=>{
        
            Swal.fire({
                title: "Category Added !!",
                icon: "success"
              });

        
    }).catch(err =>{
        console.log(err.message)
    })
}


addcatbtn.addEventListener("click",()=>{
    const nameval = catname.value
    const status = status.value
    const image = image.value
    
    const toAdd = {
        catname:nameval,
        status:status,
        image:image
    }
    
    catfetch(toAdd)
})