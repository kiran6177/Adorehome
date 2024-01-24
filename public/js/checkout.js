const proceedbtn  = document.getElementById('proceedbtn')
const crosscheck = document.querySelectorAll('.crosscheck')
const prosum = document.getElementById('prosum')
const ordertotal = document.getElementById('ordertotal')
const applybtn = document.getElementById('applybtn')
const discountrate = document.getElementById('discountrate')
const coupon = document.getElementById('coupon')
const couponerrorid = document.getElementById('couponerrorid')

// console.log(prosum.innerHTML,ordertotal.innerHTML)
const productstotal = parseInt(prosum.innerHTML.split('.')[1])
const totalamount = parseInt(ordertotal.innerHTML.split('.')[1])
console.log(productstotal,totalamount)
let newtotal = 0
let newdiscount = 0
let couponid
function changeTotal(coupondata){
    const currenttotal = parseInt(ordertotal.innerHTML.split('.')[1])
    const currentdiscount = parseInt(discountrate.innerHTML.split('.')[1])
    console.log(currenttotal,currentdiscount)
    if(currenttotal > coupondata.couponlimit){
        newtotal = currenttotal - coupondata.reductionrate
        newdiscount = currentdiscount + coupondata.reductionrate
        ordertotal.innerHTML = `Rs.${newtotal}`
        discountrate.innerHTML = `Rs.${newdiscount}`
        couponid = coupondata._id
    }
    else{
        couponerrorid.innerHTML = 'Invalid Coupon.'
        couponerrorid.style.display = 'block'
        document.cookie =`couponid=null`
        setTimeout(()=>{
            window.location.reload()
        },1000)
    }

}
async function verifyCoupon(coupon){
    try {
        const res = await fetch(`/coupon/apply?code=${coupon}`)
        const data = await res.json()
        if(data.isApplied){
            console.log(data.isApplied)
            changeTotal(data.isApplied)
        }else{
            couponerrorid.innerHTML = 'Invalid Coupon.'
            couponerrorid.style.display = 'block'
            document.cookie =`couponid=null`
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }
    } catch (error) {
        console.log(error.message)
    }
}

applybtn.addEventListener('click',()=>{
    if(couponerrorid){
        couponerrorid.style.display = 'none'
    }
    const couponcode = coupon.value
    console.log(couponcode)
    if(couponcode != ""){
    verifyCoupon(couponcode)
    }
    else{
        couponerrorid.innerHTML = 'Invalid Coupon.'
        couponerrorid.style.display = 'block'
    }
})

let proprice = 0
let proqty = 0
crosscheck.forEach(el=>{
    el.addEventListener('click',()=>{
        const checkcards = el.closest('.checkcard')
         proprice = checkcards.dataset.price
         proqty = checkcards.dataset.qty
        const couponcode = coupon.value
        verifyCoupon(couponcode)
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
    const totalamount = parseInt(ordertotal.innerHTML.split('.')[1])
    console.log(totalamount)
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
        document.cookie = `totalamount=${totalamount}`
        if(couponerrorid.innerHTML == "" && coupon.value != ""){
            document.cookie = `couponid=${couponid}`
        }
        else{
            document.cookie =`couponid=null`
        }
    }

})