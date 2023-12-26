const pname = document.getElementById('productname')
const desc = document.getElementById('description')
const color = document.getElementById('color')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const main = document.getElementById('mainimage')
const img1 = document.getElementById('img1')
const img2 = document.getElementById('img2')
const img3 = document.getElementById('img3')
const img4 = document.getElementById('img4')

const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')
const error3 = document.getElementById('error3')
const error4 = document.getElementById('error4')
const error5 = document.getElementById('error5')
const error6 = document.getElementById('error6')
const error7 = document.getElementById('error7')
const error8 = document.getElementById('error8')
const error9 = document.getElementById('error9')
const error10 = document.getElementById('error10')
const proform = document.getElementById('proform')

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

function mainval(data)
{
    if(data === 0)
    {
        error6.innerHTML = "Please select an Image."
        error6.style.display = "block"
    }
    else{
        error6.innerHTML = ""
        error6.style.display = "none"
    }
}

function img1val(data)
{
    if(data === 0)
    {
        error7.innerHTML = "Please select an Image."
        error7.style.display = "block"
    }
    else{
        error7.innerHTML = ""
        error7.style.display = "none"
    }
}

function img2val(data)
{
    if(data === 0)
    {
        error8.innerHTML = "Please select an Image."
        error8.style.display = "block"
    }
    else{
        error8.innerHTML = ""
        error8.style.display = "none"
    }
}

function img3val(data)
{
    if(data === 0)
    {
        error9.innerHTML = "Please select an Image."
        error9.style.display = "block"
    }
    else{
        error9.innerHTML = ""
        error9.style.display = "none"
    }
}

function img4val(data)
{
    if(data === 0)
    {
        error10.innerHTML = "Please select an Image."
        error10.style.display = "block"
    }
    else{
        error10.innerHTML = ""
        error10.style.display = "none"
    }
}


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

main.addEventListener('blur',()=>{
    const mdata = main.files.length
    mainval(mdata)
})
img1.addEventListener('blur',()=>{
    const i1data = img1.files.length
    img1val(i1data)
})
img2.addEventListener('blur',()=>{
    const i2data = img2.files.length
    img2val(i2data)
})
img3.addEventListener('blur',()=>{
    const i3data = img3.files.length
    img3val(i3data)
})
img4.addEventListener('blur',()=>{
    const i4data = img4.files.length
    img4val(i4data)
})

proform.addEventListener('submit',(e)=>{
    const pdata = pname.value
    const ddata = desc.value
    const cdata = color.value
    const prdata = price.value
    const sdata = stock.value
    const mdata = main.files.length
    const i1data = img1.files.length
    const i3data = img3.files.length
    const i2data = img2.files.length
    const i4data = img4.files.length

    img4val(i4data)
    img2val(i2data)
    img3val(i3data)
    img1val(i1data)
    mainval(mdata)
    stockval(sdata)
    priceval(prdata)
    colorval(cdata)
    descval(ddata)
    pnameval(pdata)

    if(error1.innerHTML !=="" || error2.innerHTML !=="" || error3.innerHTML !=="" || error4.innerHTML !=="" || error5.innerHTML !=="" || error6.innerHTML !=="" || error7.innerHTML !=="" || error8.innerHTML !==""|| error9.innerHTML !=="" || error10.innerHTML !=="")
    {
        e.preventDefault()
    }
})