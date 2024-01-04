
const addtocart = document.querySelectorAll('#addcartbtn')

function addCart(proid,qty)
{
    fetch(`/cart/addcart?proid=${proid}&qty=${qty}`)
    .then(res =>{
        return res.json()    
    })
    .then(data =>{
        if(data.data)
        {
            Swal.fire({
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

        }
        else if(data.err){
            Swal.fire({
                title: data.err,
                icon: "error",
                confirmButtonText:"OK"
                })
                .then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.reload()
                    }
                })  
        }
        else if(data.stockerr)
        {
            Swal.fire({
                title: data.stockerr,
                icon: "error",
                confirmButtonText:"OK"
                })
                .then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.reload()
                    }
                }) 
        }
    })
}

addtocart.forEach(el =>{
    el.addEventListener('click',function(){
        let proid = this.dataset.proid
        let qty = 1
        console.log(proid)
        addCart(proid,qty)
    })
})