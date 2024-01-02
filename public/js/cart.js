const leftbtn = document.querySelectorAll('.leftbtn')
const rightbtn = document.querySelectorAll('.rightbtn')
const rembtn = document.querySelectorAll('.itemrem')

async function incQty(qty,proid){
    const res = await fetch(`/cart/qtyadd?qty=${qty}&proid=${proid}`)
    const data = await res.json()
        if(data.data)
        {
            return true
        }
        else if(data.stockerr){
            Swal.fire({
                title: data.stockerr,
                icon: "info"
                })
            return false
        }
        else{
            return false
        }
}

async function decQty(qty,proid){
    try{
    const res = await fetch(`/cart/qtysub?qty=${qty}&proid=${proid}`)
    const data = await res.json()
    
        if(data.data)
        {
            return true
        }
        else if(data.stockerr){
            Swal.fire({
                title: data.stockerr,
                icon: "info"
                })
                return false
        }
        else{
            return false
        }
    }
    catch(err)
    {
        console.log(err.message)
    }
}

async function delCart(proid)
{
    const res = await fetch(`/cart/delcart?proid=${proid}`)
    const data = await res.json()
    if(data.data)
    {
        return val = Swal.fire({
            title: data.data,
            icon: "info",
            confirmButtonText:"OK"
            })
            .then(res=>{
                if(res.isConfirmed)
                {
                    return true
                }
            })
    }
    else{
        return false
    }
}


leftbtn.forEach(el=>{
    el.addEventListener('click',()=>{
        const pid = el.dataset.proleft
        const qtyview = document.getElementById(`qty_${pid}`).innerHTML
        const qtyrate = parseInt(qtyview)
        if(qtyrate > 1)
        {
            decQty(qtyrate-1,pid)
                .then(dec=>{
                    console.log(dec)
                    if(dec)
                    {
                        window.location.reload()
                    }
                    else{
                        console.log("Error in decrement")
                    }
                    console.log(qtyrate)
                })
                .catch(err=>{
                    console.log(err.message)
                })
        }
        else{
            delCart(pid)
                .then(del=>{
                    if(del)
                    {     
                        window.location.reload()   
                    }
                    else{
                        console.log("error in deletion")
                    }
                })
                .catch(err=>{
                    console.log(err.message)
                })


        }
    })
})

rightbtn.forEach(el=>{
    el.addEventListener('click',()=>{
        const pid = el.dataset.proright
        const qtyview = document.getElementById(`qty_${pid}`).innerHTML
       const qtydat =  parseInt(qtyview)
       if(qtydat > 0)
       {
        incQty(qtydat+1,pid)
                .then(inc=>{
                console.log(inc)
                if(inc)
                {
                window.location.reload()
                }
                else{
                    console.log("error in increment")
                }
                 console.log(qtydat)
                })
                .catch(err=>{
                    console,log(err.message)
                })
                
       }
    })
})

rembtn.forEach(el=>{
    el.addEventListener('click',()=>{
        const pid = el.dataset.rem
        delCart(pid)
                .then(del=>{
                    if(del)
                    {     
                        window.location.reload()   
                    }
                    else{
                        console.log("error in deletion")
                    }
                })
                .catch(err=>{
                    console.log(err.message)
                })
    })
})