const proceedbtn  = document.getElementById('proceedbtn')
const crosscheck = document.querySelectorAll('.crosscheck')
const prosum = document.getElementById('prosum')
const ordertotal = document.getElementById('ordertotal')

// console.log(prosum.innerHTML,ordertotal.innerHTML)
const productstotal = parseInt(prosum.innerHTML.split('.')[1])
const totalamount = parseInt(ordertotal.innerHTML.split('.')[1])
console.log(productstotal,totalamount)

let proprice = 0
let proqty = 0
crosscheck.forEach(el=>{
    el.addEventListener('click',()=>{
        const checkcards = el.closest('.checkcard')
         proprice = checkcards.dataset.price
         proqty = checkcards.dataset.qty
        prosum.innerHTML = `Rs. ${productstotal - (proprice*proqty)}`
        ordertotal.innerHTML = `Rs. ${totalamount - (proprice*proqty)}`
        checkcards.style.display = "none"
        
    })
})





proceedbtn.addEventListener('click',(e)=>{
    const radio = document.querySelectorAll('.addressradio')
    const isChecked = Array.from(radio).some(el => el.checked)
    const checkcards = document.querySelectorAll('.checkcard')

    const cardvisible = Array.from(checkcards).filter(el=>el.style.display != "none")
    let id = cardvisible.map(el=>{
        const pid = el.querySelector('.productsId').value
        return pid
    })


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