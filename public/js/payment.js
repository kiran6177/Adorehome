const placeorder = document.getElementById('placeorder')

placeorder.addEventListener('click',(e)=>{
    const payradio = document.querySelectorAll('.payradio')
    const isChecked = Array.from(payradio).some(el=>el.checked)
    const checkprodet = document.querySelector('.checkprodet')
    
    if(!isChecked)
    {
            e.preventDefault()
            Swal.fire({
                title:"Select any Payment Option.",
                icon:"info"
            })
    }
    else if(!checkprodet)
    {
        e.preventDefault()
            Swal.fire({
                title:"No Products Available.",
                icon:"error"
            })
    }
    // else{
        
    //     e.preventDefault()
    //     const check = Array.from(payradio).filter(el=>el.checked)
    //     console.log(check[0].value)
    // }
})