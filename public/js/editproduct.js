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

    if(error1.innerHTML !=="" || error2.innerHTML !=="" || error3.innerHTML !=="" || error4.innerHTML !=="" || error5.innerHTML !=="" )
    {
        e.preventDefault()
    }
})