const cartaddbtn = document.getElementById('cartaddbtn')
const buynowbtn = document.getElementById('buynowbtn')
const minusbtn1 = document.getElementById('minusbtn1')
const plusbtn1 = document.getElementById('plusbtn1')
const qtyfield = document.getElementById('qtyfield')
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
                icon: "info"
                })
        }
    })
}

function addBuyCart(proid,qty)
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
                    window.location.href = '/checkout'
                }
            })

        }
        else if(data.err){
            Swal.fire({
                title: data.err,
                icon: "success",
                confirmButtonText:"OK"
                })
                .then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.href = '/checkout'
                    }
                })
        }
        else if(data.stockerr)
        {
            Swal.fire({
                title: data.stockerr,
                icon: "info"
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


cartaddbtn.addEventListener('click',function(){
    let proid = this.dataset.productid
    let qty = parseInt(qtyfield.innerHTML.trim())
    console.log(qty,proid)
    addCart(proid,qty)
})

console.log("hey")

minusbtn1.addEventListener('click',function(){

    let qtyvalue = parseInt(qtyfield.innerHTML.trim())
    if(qtyvalue > 1)
    {
        qtyfield.innerHTML = --qtyvalue
    console.log(qtyvalue)

    }
})

plusbtn1.addEventListener('click',function(){

    let qtyvalue = parseInt(qtyfield.innerHTML.trim())
    if(qtyvalue > 0)
    {
        qtyfield.innerHTML = ++qtyvalue
        console.log(qtyvalue)
    }


})

buynowbtn.addEventListener('click',function(){
    let proid = this.dataset.productid
    let qty = parseInt(qtyfield.innerHTML.trim())
    addBuyCart(proid,qty)

})

$('#zoom_01').ezPlus({
    zoomType: 'inner',
    cursor: 'crosshair'
});
