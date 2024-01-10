const pname = document.getElementById('productname')
const desc = document.getElementById('description')
const color = document.getElementById('color')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')
const error3 = document.getElementById('error3')
const error4 = document.getElementById('error4')
const error5 = document.getElementById('error5')
const error6 = document.getElementById('error6')
const error7 = document.getElementById('error7')

const proform = document.getElementById('proform')
const imgrembtn = document.querySelectorAll('.remclose')
const imgrembtn1 = document.querySelector('.remclose1')
const plus = document.getElementById('preadd')
const plus1 = document.getElementById('pre1add')
const plus2 = document.getElementById('pre2add')
const plus3 = document.getElementById('pre3add')
const plus4 = document.getElementById('pre4add')
const input = document.getElementById('mainimage')
const input1 = document.getElementById('img1')
const input2 = document.getElementById('img2')
const input3 = document.getElementById('img3')
const input4 = document.getElementById('img4')
const pre = document.getElementById('pre')
const pre1 = document.getElementById('pre1')
const pre2 = document.getElementById('pre2')
const pre3 = document.getElementById('pre3')
const pre4 = document.getElementById('pre4')



function pnameval(data)
{
    if(data.trim()==="")
    {
        error1.innerHTML = "Please Enter Product Name."
        error1.style.display = "block"
    }
    else{
        error1.innerHTML = ""
        error1.style.display = "none"
    }
}

function descval(data)
{
    if(data.trim()==="")
    {
        error2.innerHTML = "Please Enter Description."
        error2.style.display = "block"
    }
    else{
        error2.innerHTML = ""
        error2.style.display = "none"
    }
}

function colorval(data)
{
    if(data.trim()==="")
    {
        error3.innerHTML = "Please Enter Color."
        error3.style.display = "block"
    }
    else{
        error3.innerHTML = ""
        error3.style.display = "none"
    }
}

function priceval(data)
{   
    const nonNegPattern = /^\d+$/;

    if(data.trim()==="")
    {
        error4.innerHTML = "Please Enter Price."
        error4.style.display = "block"
    }
    else if(!nonNegPattern.test(data))
    {
        error4.innerHTML = "Please Enter Valid Price."
        error4.style.display = "block"
    }
    else{
        error4.innerHTML = ""
        error4.style.display = "none"
    }
}

function stockval(data)
{   
    const nonNegPattern = /^\d+$/;

    if(data.trim()==="")
    {
        error5.innerHTML = "Please Enter Stock Quantity."
        error5.style.display = "block"
    }
    else if(!nonNegPattern.test(data))
    {
        error5.innerHTML = "Please Enter valid Quantity."
        error5.style.display = "block"
    }
    else{
        error5.innerHTML = ""
        error5.style.display = "none"
    }
}

function mainval(mainvalue)
{   const files = mainvalue.files
    if(!files[0].type.startsWith('image/'))
    {
        error6.innerHTML = "Please Select Some images"
        error6.style.display = "block"
    }
    else{
        error6.innerHTML = ""
        error6.style.display = "none"
    }
}
function imgval(mainvalue)
{   const files = mainvalue.files
    if(!files[0].type.startsWith('image/'))
    {
        error7.innerHTML = "Please Select Some images"
        error7.style.display = "block"
    }
    else{
        error7.innerHTML = ""
        error7.style.display = "none"
    }
}
// function imgval(imgvalue)
// {   
//     if(mainval == "")
//     {
//         error6.innerHTML = "Please Select Some images"
//         error6.style.display = "block"
//     }
//     else{
//         error6.innerHTML = ""
//         error6.style.display = "none"
//     }
// }
pname.addEventListener('keyup',()=>{
    const pdata = pname.value
    pnameval(pdata)
})
pname.addEventListener('blur',()=>{
    const pdata = pname.value
    pnameval(pdata)
})

desc.addEventListener('keyup',()=>{
    const ddata = desc.value
    descval(ddata)
})
desc.addEventListener('blur',()=>{
    const ddata = desc.value
    descval(ddata)
})

color.addEventListener('keyup',()=>{
    const cdata = color.value
    colorval(cdata)
})
color.addEventListener('blur',()=>{
    const cdata = color.value
    colorval(cdata)
})

price.addEventListener('keyup',()=>{
    const prdata = price.value
    priceval(prdata)
})
price.addEventListener('blur',()=>{
    const pdata = price.value
    priceval(pdata)
})

stock.addEventListener('keyup',()=>{
    const sdata = stock.value
    stockval(sdata)
})
stock.addEventListener('blur',()=>{
    const sdata = stock.value
    stockval(sdata)
})



proform.addEventListener('submit',(e)=>{
    const pdata = pname.value
    const ddata = desc.value
    const cdata = color.value
    const prdata = price.value
    const sdata = stock.value

    stockval(sdata)
    priceval(prdata)
    colorval(cdata)
    descval(ddata)
    pnameval(pdata)

    if(error1.innerHTML !=="" || error2.innerHTML !=="" || error3.innerHTML !=="" || error4.innerHTML !=="" || error5.innerHTML !=="" || error6.innerHTML !==""|| error7.innerHTML !=="" )
    {
        e.preventDefault()
    }
})

async function remPreImage(img,id,pos)
{
    try {
        const res = await fetch(`/admin/products/editproduct/remimg?img=${img}&id=${id}&pos=${pos}`)
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
    } catch (error) {
         console.log(error.message)
    }
}
async function remPreImage1(img,id)
{
    try {
        const res = await fetch(`/admin/products/editproduct/remimg?mainimg=${img}&id=${id}`)
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
    } catch (error) {
         console.log(error.message)
    }
}

if(imgrembtn)
{imgrembtn.forEach(el=>{
    el.addEventListener('click',()=>{
        const imgval = el.dataset.imgname
        const proid = el.dataset.proid
        const imgpos = parseInt(el.dataset.imgpos)
        console.log(imgpos)
        Swal.fire({
            title:"Deleting the Image?",
            icon:"info",
            showConfirmButton:true,
            showDenyButton:true,
            confirmButtonText:"OK",
            denyButtonText:"Cancel"
        })
        .then(res=>{
            if(res.isConfirmed)
            {        
                remPreImage(imgval,proid,imgpos)
            }
        })
    })
})}

if(imgrembtn1)
{imgrembtn1.addEventListener('click',()=>{
    const mainimgval = imgrembtn1.dataset.imgname
    const proid = imgrembtn1.dataset.proid
    Swal.fire({
        title:"Deleting the Image?",
        icon:"info",
        showConfirmButton:true,
        showDenyButton:true,
        confirmButtonText:"OK",
        denyButtonText:"Cancel"
    })
    .then(res=>{
        if(res.isConfirmed)
        {        
            remPreImage1(mainimgval,proid)
        }
    })
})}

function loadPreview(event,plus)
{
    const files = event.target.files
    if(files && files[0])
    {
        const reader = new FileReader()

        reader.onload = function (e)
        {
             plus.src = e.target.result
        }

        reader.readAsDataURL(files[0])
    }
}

if(plus)
{
    plus.addEventListener('click',()=>{
        input.click()
    })
}

if(input)
{
    input.addEventListener('change',(e)=>{
        mainval(input)
        loadPreview(e,plus)
    })
}

function loadPreview1(event,plus1)
{
    const files = event.target.files
    if(files && files[0])
    {
        const reader = new FileReader()

        reader.onload = function (e)
        {
             plus1.src = e.target.result
        }

        reader.readAsDataURL(files[0])
    }
}

if(plus1)
{
    plus1.addEventListener('click',()=>{
        input1.click()
    })
}

if(input1)
{
    input1.addEventListener('change',(e)=>{
        imgval(input1)
        loadPreview1(e,plus1)
    })
}
function loadPreview2(event,plus2)
{
    const files = event.target.files
    if(files && files[0])
    {
        const reader = new FileReader()

        reader.onload = function (e)
        {
             plus2.src = e.target.result
        }

        reader.readAsDataURL(files[0])
    }
}

if(plus2)
{
    plus2.addEventListener('click',()=>{
        input2.click()
    })
}

if(input2)
{
    input2.addEventListener('change',(e)=>{
        imgval(input2)
         loadPreview1(e,plus2)
    })
}

function loadPreview3(event,plus3)
{
    const files = event.target.files
    if(files && files[0])
    {
        const reader = new FileReader()

        reader.onload = function (e)
        {
             plus3.src = e.target.result
        }

        reader.readAsDataURL(files[0])
    }
}

if(plus3)
{
    plus3.addEventListener('click',()=>{
        input3.click()
    })
}

if(input3)
{
    input3.addEventListener('change',(e)=>{
        imgval(input3)
         loadPreview3(e,plus3)
    })
}

function loadPreview4(event,plus4)
{
    const files = event.target.files
    if(files && files[0])
    {
        const reader = new FileReader()

        reader.onload = function (e)
        {
             plus4.src = e.target.result
        }

        reader.readAsDataURL(files[0])
    }
}

if(plus4)
{
    plus4.addEventListener('click',()=>{
        input4.click()
    })
}

if(input4)
{
    input4.addEventListener('change',(e)=>{
        imgval(input4)
         loadPreview1(e,plus4)
    })
}