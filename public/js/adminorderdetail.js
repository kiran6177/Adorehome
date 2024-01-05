
const statuschanger = document.getElementById('deliverystatus')
const order = document.getElementById('orderid')


async function changeStatus(val,id)
{
    try {
        
        const res = await fetch(`/admin/orders/orderdetail/changestatus?id=${id}&val=${val}`)
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
        console.log(error.message)
    }
}

statuschanger.addEventListener('change',()=>{
    const status = statuschanger.value
    const orderid = order.value
    console.log(status,orderid)
    changeStatus(status,orderid)
})