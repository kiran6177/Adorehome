
const statuschanger = document.querySelectorAll('.deliverystatus')
const order = document.getElementById('orderid')
const refundbtn = document.querySelectorAll('.refundbtn')

async function changeStatus(val,id,proid)
{
    try {
        
        const res = await fetch(`/admin/orders/orderdetail/changestatus?id=${id}&val=${val}&proid=${proid}`)
        const data = await res.json()

        if(data.data)
        {
            Swal.fire({
                title:data.data,
                icon:"success",
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
                title:data.err,
                icon:"error",
                confirmButtonText:"OK"
            })
            .then(res=>{
                if(res.isConfirmed)
                {
                    window.location.reload()
                }
            })
        }
    } catch (error) {
        window.location.href = '/admin/login'
        console.log(error.message)
    }
}


statuschanger.forEach(element=>{
    element.addEventListener('change',()=>{
        const status = element.value
        const orderid = order.value
        const proid = element.dataset.proid
        

        console.log(status,orderid,proid)
         changeStatus(status,orderid,proid)
        
    })
})

async function initiateRefund(proid,orderid){
    try {
        const res = await fetch(`/admin/orders/orderdetail/initiaterefund?pid=${proid}&oid=${orderid}`)
        const data = await res.json()
        if(data.refunded){
            Swal.fire({
                title:data.refunded,
                icon:"success",
                confirmButtonText:"OK"
            })
            .then(res=>{
                if(res.isConfirmed){
                    window.location.reload()
                }
            })
        }else{
            console.log(data)
        }
    } catch (error) {
        console.log(error.message)
    }
}


refundbtn.forEach(el=>{
    el.addEventListener('click',()=>{
        const proid = el.dataset.proid
        const orderid = order.value
        console.log(proid,orderid)
        initiateRefund(proid,orderid)
    })
})