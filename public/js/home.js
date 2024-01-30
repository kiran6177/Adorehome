
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


const bannerimg = document.getElementById('bannerimg')
const prevbtn = document.getElementById('prevbtn')
const nextbtn = document.getElementById('nextbtn')
const bannercontent = document.getElementById('bannercontent')
let bannerdata = []
let imagearray = []

window.onload = async function(){
    try {
        const res = await fetch(`/getbanner`)
        const data = await res.json()
        if(data){
            console.log(data.banner)
            data.banner.forEach(el=>{
                let obj = {
                    head:el.bannertitle,
                    desc:el.description
                }
                bannerdata.push(obj)

                imagearray.push(`/assets/${el.bannerimage}`)
            })
            insertBanner(0)
            let i = 0   
            setInterval(()=>{
                if(i === imagearray.length - 1){
                    i = 0
                }
                else{
                    i++
                }
                insertBanner(i)
            },4000)
        }
        else{
            console.log('error')
        }
    } catch (error) {
        console.log(error.message)
    }
}

function insertBanner(pos){
    bannerimg.style.transform = 'translateX(-100%)'
    if(pos > imagearray.length - 1){
        pos = 0
    }
setTimeout(()=>{ bannerimg.src  = imagearray[pos]
    bannerimg.style.opacity = '1'
    bannercontent.getElementsByTagName('h1')[0].innerHTML = bannerdata[pos].head
    bannercontent.getElementsByTagName('p')[0].innerHTML = bannerdata[pos].desc
    bannercontent.style.opacity = '1'

},200)
setTimeout(()=>{
    bannerimg.style.transform = 'translateX(0%)'
   },200)
}
let i = 0
prevbtn.addEventListener('click',()=>{
    bannerimg.style.transform = 'translateX(100%)'
    bannerimg.style.opacity = '0'
    bannercontent.style.opacity = '0'
    setTimeout(()=>{
    if(i==0){
        i = imagearray.length - 1
    }
    else{
        i--
    }
    insertBanner(i)
    },200)

})
nextbtn.addEventListener('click',()=>{
    bannerimg.style.transform = 'translateX(100%)'
    bannerimg.style.opacity = '0'
    bannercontent.style.opacity = '0'
    setTimeout(() => {
    insertBanner(i + 1)
    if(i==imagearray.length - 1){
        i = 0
    }
    else{
        i++
    }
    }, 200);

})