const cancelorderbtn = document.querySelectorAll('.cancelorderbtn')


async function cancelOrder(oid)
{
    const res = await fetch(`/orders/cancel?id=${oid}`)
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
        console.log(orderId)
        cancelOrder(orderId)
    })
})