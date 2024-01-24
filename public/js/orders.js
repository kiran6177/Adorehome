const cancelorderbtn = document.querySelectorAll('.cancelorderbtn')


async function cancelOrder(oid,pid)
{
    try
    {const res = await fetch(`/orders/cancel?oid=${oid}&pid=${pid}`)
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

    }}
    catch(err)
    {
        window.location.href = '/login'
    }
}

cancelorderbtn.forEach(el=>{
    el.addEventListener('click',()=>{
        let orderId = el.dataset.orderid
        let proid = el.dataset.proid
        console.log(orderId,proid)
        Swal.fire({
            title:"Are you Sure??",
            icon:"info",
            showDenyButton:true,
            confirmButtonText:"OK",
            denyButtonText:"Cancel"
        }).then(res=>{
            if(res.isConfirmed)
            {
                cancelOrder(orderId,proid)
            }
            else if(res.isDenied){
                window.location.reload()
            }
        })
    })
})