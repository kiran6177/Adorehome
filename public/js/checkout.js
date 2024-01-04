const proceedbtn  = document.getElementById('proceedbtn')
const productsId = document.querySelectorAll('.productsId')

let id = []
 productsId.forEach(el=>{
    id.push(el.value) 
 })
 console.log(id)
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