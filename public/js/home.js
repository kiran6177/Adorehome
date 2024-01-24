
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
    .catch(err=>{
        window.location.href = '/login'

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

const wishiconsolid3 = document.querySelectorAll('.wishiconsolid3')
const wishicon3 = document.querySelectorAll('.wishicon3')

async function addWishlist(proid){
    try {
      const res = await fetch(`/wishlist/add?productid=${proid}`)
      const data = await res.json()
      if(data.success){
        return true
      }
      else{
        return false
      }
    } catch (error) {
      window.location.href = '/login'
      console.log(error.message)
    }
  }
  async function removeWishlist(proid){
    try {
      const res = await fetch(`/wishlist/rem?productid=${proid}`)
      const data = await res.json()
      if(data.success){
        return true
      }
      else{
        return false
      }
    } catch (error) {
      window.location.href = '/login'
      console.log(error.message)
    }
  }


wishiconsolid3.forEach(el=>{
    el.addEventListener('click',()=>{
        const proid = el.dataset.proid
        console.log(proid)
       const removed =  removeWishlist(proid)
       if(removed){
        window.location.reload()
       }
    })
})

wishicon3.forEach(el=>{
    el.addEventListener('click',()=>{
        const proid = el.dataset.proid
        console.log(proid)
        const added = addWishlist(proid)
        if(added){
            window.location.reload()
        }
    })
})