const cancelorderbtn = document.querySelectorAll('.cancelorderbtn')


async function cancelOrder(oid,pid)
{
    const res = await fetch(`/orders/cancel?oid=${oid}&pid=${pid}`)
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
    else if(data.err)
    {

    }
}

cancelorderbtn.forEach(el=>{
    el.addEventListener('click',()=>{
        let orderId = el.dataset.orderid
        let proid = el.dataset.proid
        console.log(orderId,proid)
        cancelOrder(orderId,proid)
    })
})