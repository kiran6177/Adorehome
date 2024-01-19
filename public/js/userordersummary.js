
const invoicebtn = document.getElementById('invoicebtn')

async function createInvoice(oid)
{
    try {
        const res = await fetch(`/generateInvoice?id=${oid}`)
        const data = await res.json()
        if(data.pdfData)
        {
            
            easyinvoice.download("AdoreHome_Invoice.pdf",data.pdfData)
        }
        else{

        }
    } catch (error) {
        window.location.href = '/login'
        console.log(error.message)
    }
}

invoicebtn.addEventListener('click',()=>{
    const orderid = invoicebtn.dataset.orderid
    console.log(orderid)
    createInvoice(orderid)
})