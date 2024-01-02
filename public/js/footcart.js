const cartbtn = document.getElementById('cartbtn')
const cartslide = document.querySelector('.cartslide')
const minusbtn = document.querySelectorAll('.minusbtn')
const plusbtn = document.querySelectorAll('.plusbtn')

let cart = false

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


cartbtn.addEventListener('click',()=>{
    if(overlay.style.display =='none')
    {
        overlay.style.display = "block"
        overlay.style.height = '100%'
        cartslide.style.display = 'block'
        cartslide.style.width = "43%"
    }
    else{
        overlay.style.height = '0%'
        overlay.style.display = "none"
        cartslide.style.display = 'none'
        cartslide.style.width = "0%"
    }
})



if(minusbtn)
{   
    minusbtn.forEach(element => {
        element.addEventListener('click',function(){
            const proid = element.dataset.prominid
            console.log(proid)
        const qtychange = document.getElementById(`qtychange_${proid}`)
            let qtyvalue = parseInt(qtychange.innerHTML)
            if(qtyvalue > 1)
            {
                decQty(qtyvalue-1,proid)
                .then(dec=>{
                    console.log(dec)
                    if(dec)
                    {
                    qtychange.innerHTML = --qtyvalue
                    }
                    else{
                        console.log("Error in decrement")
                    }
                    console.log(qtyvalue)
                })
                .catch(err=>{
                    console.log(err.message)
                })
                
            
            }
            else{
                delCart(proid)
                .then(del=>{
                    // console.log(del)
                    if(del)
                    {
                        
                        window.location.reload()
                        // overlay.style.display = "block"
                        // overlay.style.height = '100%'
                        // cartslide.style.display = 'block'
                        // cartslide.style.width = "43%"
                    }
                    else{

                    }
                })
                .catch(err=>{
                    console.log(err.message)
                })


            }
            })
    });

        
}


if(plusbtn)
{
    plusbtn.forEach(element =>{
        element.addEventListener('click',function(){
            const proid = element.dataset.promaxid
            const qtychange = document.getElementById(`qtychange_${proid}`)
            let qtyvalue = parseInt(qtychange.innerHTML)
            if(qtyvalue > 0)
            {   
                incQty(qtyvalue+1,proid)
                .then(inc=>{
                console.log(inc)
                if(inc)
                {
                qtychange.innerHTML = ++qtyvalue

                }
                else{
                    console.log("error in increment")
                }
                 console.log(qtyvalue)
                })
                .catch(err=>{
                    console,log(err.message)
                })
                
            
            }
            
            })
    })

}


        
    

