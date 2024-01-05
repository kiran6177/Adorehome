const proceedbtn  = document.getElementById('proceedbtn')
const crosscheck = document.querySelectorAll('.crosscheck')

crosscheck.forEach(el=>{
    el.addEventListener('click',()=>{
        const checkcards = el.closest('.checkcard')
        checkcards.style.display = "none"
        
    })
})
// let products = []
// id.forEach(el=>{
//     let obj = {
//         product_id: el.split(',')[0],
//         qty:el.split(',')[1]
//     }
//     products.push(obj)
// })
// console.log(products)




proceedbtn.addEventListener('click',(e)=>{
    const radio = document.querySelectorAll('.addressradio')
    const isChecked = Array.from(radio).some(el => el.checked)
    const checkcards = document.querySelectorAll('.checkcard')

    const cardvisible = Array.from(checkcards).filter(el=>el.style.display != "none")
    let id = cardvisible.map(el=>{
        const pid = el.querySelector('.productsId').value
        return pid
    })

    // let id = []
    // productsId.forEach(el=>{
    //     if(el.style.display != "none" && el.value != "")
    //     {
    //         id.push(el.value) 
    //     }
    // })
    console.log(id)
    let addid;

    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        addid = radio[i];
        break;
      }
    }

    
    if(!isChecked)
    {
        e.preventDefault()
        Swal.fire({
            title:"Select your Address.",
            icon:"info"
        })
    }
    else{
        document.cookie = `prodet=${JSON.stringify(id)}`
        document.cookie = `addressid=${addid.value}`
        
    }

})