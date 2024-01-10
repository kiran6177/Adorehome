const pname = document.getElementById('productname')
const desc = document.getElementById('description')
const color = document.getElementById('color')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const main = document.getElementById('mainimage')
const imgs = document.getElementById('imgs')


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

const preview1 = document.getElementById('preview1')
const preview2 = document.getElementById('preview2')

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

function mainval(data,mmtype)
{
    if(data === 0)
    {
        error6.innerHTML = "Please select an Image."
        error6.style.display = "block"
    }
    else if(!mmtype.startsWith('image/'))
    {
        error6.innerHTML = "Please select Image Files Only."
        error6.style.display = "block"
    }
    else{
        error6.innerHTML = ""
        error6.style.display = "none"
    }
}

function imgsval(data,files)
{   
    let imgdat = []
    for(let element of files){
        if(!element.type.startsWith('image/'))
        {
            imgdat.push(element) 
        }
    }
    console.log(imgdat)
    if(data !== 4)
    {
        error7.innerHTML = "Please select 4 Images."
        error7.style.display = "block"
    }
    else if(imgdat.length > 0)
    {   
        error7.innerHTML = "Please select  Images Only."
        error7.style.display = "block"
    }
    else{
        error7.innerHTML = ""
        error7.style.display = "none"
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

main.addEventListener('change',()=>{
    const mdata = main.files.length
    const mmtype = main.files[0].type
    console.log(mmtype)
    mainval(mdata,mmtype)
})
imgs.addEventListener('change',()=>{
    const i1data = imgs.files.length
    const fileval = imgs.files
    console.log(fileval)
    imgsval(i1data,fileval)
})


proform.addEventListener('submit',(e)=>{
    const pdata = pname.value
    const ddata = desc.value
    const cdata = color.value
    const prdata = price.value
    const sdata = stock.value
    const mdata = main.files.length
    const i1data = imgs.files.length
    const mtype = main.files[0].type


    imgsval(i1data)
    mainval(mdata,mtype)
    stockval(sdata)
    priceval(prdata)
    colorval(cdata)
    descval(ddata)
    pnameval(pdata)

    if(error1.innerHTML !=="" || error2.innerHTML !=="" || error3.innerHTML !=="" || error4.innerHTML !=="" || error5.innerHTML !=="" || error6.innerHTML !=="" || error7.innerHTML !=="" )
    {
        e.preventDefault()
    }
})


function loadMain(event,preview1)
{   
    if(preview1.hasChildNodes())
    {
        while(preview1.firstChild)
        {
            preview1.removeChild(preview1.firstChild)
        }
    }
    const files = event.target.files
    console.log(files)
    
    if(files && files[0])
    {
        const reader = new FileReader()

        reader.onload = function (e)
        {
  
            const mainpre = document.createElement('img')
            mainpre.style.aspectRatio = '1/1'
            mainpre.style.width = "200px"
            mainpre.style.height = "200px"
            
            mainpre.src = e.target.result

            preview1.appendChild(mainpre)
        }

        reader.readAsDataURL(files[0])
    }
}

main.addEventListener('change',(e)=>{
    loadMain(e,preview1)
})


function loadMain1(event,preview2)
{   
    if(preview2.hasChildNodes())
    {
        while(preview2.firstChild)
        {
        preview2.removeChild(preview2.firstChild)
        }
    }
    const files = event.target.files
    console.log(files.length)
    if(files && files.length === 4)
    {
        for(let element of files) {
            
           
        const reader = new FileReader()

        reader.onload = function (e)
        {   
            
            const imgpre = document.createElement('img')
            imgpre.src = ""
            imgpre.src = e.target.result
            imgpre.style.width = "200px"
            imgpre.style.height = "200px"
            preview2.appendChild(imgpre)
        }

        reader.readAsDataURL(element)
    };
    }
}

imgs.addEventListener('change',(e)=>{
    loadMain1(e,preview2)
})