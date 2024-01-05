const placeorder = document.getElementById('placeorder')

placeorder.addEventListener('click',(e)=>{
    const payradio = document.querySelectorAll('.payradio')
    const isChecked = Array.from(payradio).some(el=>el.checked)

    if(!isChecked)
    {
            e.preventDefault()
            Swal.fire({
                title:"Select any Payment Option.",
                icon:"info"
            })
    }
    // else{
        
    //     e.preventDefault()
    //     const check = Array.from(payradio).filter(el=>el.checked)
    //     console.log(check[0].value)
    // }
})