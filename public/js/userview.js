
const blockbtn = document.querySelectorAll('#blockbtn1')
const unblockbtn = document.querySelectorAll('#unblockbtn1')


function block(id){

    fetch(`http://localhost:3003/admin/users/blockuser?id=${id}`)
    .then(res=>{
        return res.json()
    })
    .then( data =>{
        if(data)
        {   
            if(data.blocked)
            {
                Swal.fire({
                    title: data.blocked,
                    icon: "warning",
                    confirmButtonText:"OK"
                }).then(res=>{
                  if(res.isConfirmed)
                  {
                      window.location.reload()
                  }

                })
            }
            else{
                Swal.fire({
                    title: data.err,
                    icon: "error",
                    confirmButtonText:"OK"
                }).then(res=>{
                  if(res.isConfirmed)
                  {
                      window.location.href = "http://localhost:3003/admin/users"
                  }
                })
            }
            
        }
        else{
            console.log("Can't Delete")
        }
    })
}

function unblock(id){

    fetch(`http://localhost:3003/admin/users/unblockuser?id=${id}`)
    .then(res=>{
        return res.json()
    })
    .then( data =>{
        if(data)
        {   
            if(data.unblocked)
            {
                Swal.fire({
                    title: data.unblocked,
                    icon: "warning",
                    confirmButtonText:"OK"
                  }).then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.reload()
                    }

                  })
                  
                 
            }
            else{
                Swal.fire({
                    title: data.err,
                    icon: "error",
                    confirmButtonText:"OK"
                  }).then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.href = "http://localhost:3003/admin/users"
                    }
                  })
            }
            
        }
        else{
            console.log("Can't Delete")
        }
    })
}
if(blockbtn){
    blockbtn.forEach(el =>{
        el.addEventListener('click',()=>{
            const id = el.dataset.uid

            Swal.fire({
                title:"Are you Sure ??",
                icon:"info",
                showDenyButton:true,
                showConfirmButton:true,
                confirmButtonText:"Block",
                denyButtonText:"Cancel"
            }).then(res=>{
                if(res.isConfirmed)
                {
                   block(id)
                }
                else if(res.isDenied)
                {
                    window.location.reload()
                }
            })
    })
    })
}

if(unblockbtn){
    unblockbtn.forEach(el =>{
        el.addEventListener('click',()=>{
            // console.log("called 0")
            const id = el.dataset.uid
            Swal.fire({
                title:"Are you Sure ??",
                icon:"info",
                showDenyButton:true,
                showConfirmButton:true,
                confirmButtonText:"Unblock",
                denyButtonText:"Cancel"
            }).then(res=>{
                if(res.isConfirmed)
                {
                   unblock(id)
                }
                else if(res.isDenied)
                {
                    window.location.reload()
                }
            })
    })

    })
}

