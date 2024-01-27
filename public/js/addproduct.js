const pname = document.getElementById('productname')
const desc = document.getElementById('description')
const color = document.getElementById('color')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const main = document.getElementById('mainimage')
const imgs = document.getElementById('imgs')

const mainmodimg = document.getElementById('mainmodimg')

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

let mainpre
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
  
            mainpre = document.createElement('img')
            mainpre.style.aspectRatio = '1/1'
            mainpre.style.width = "200px"
            mainpre.style.height = "200px"
            mainpre.id = 'previewmain'
            mainpre.src = e.target.result
            preview1.appendChild(mainpre)
        }

        reader.readAsDataURL(files[0])
    }
}
let cropper
let cropper1


main.addEventListener('change',(e)=>{
    loadMain(e,preview1)
    const maincrop = document.createElement('button')
    maincrop.type = "button"
    maincrop.innerHTML = "CROP"
    maincrop.id = "maincropbtn"
    preview1.appendChild(maincrop)
    const maincropbtn = document.querySelector('#maincropbtn')

    if(maincropbtn){
    console.log(maincropbtn)
    maincropbtn.addEventListener('click',()=>{
        if(cropper1){
            cropper1.destroy()
        }
        if(cropper){
            cropper.destroy()
        }
        
        mainmodimg.src = document.getElementById('previewmain').src
        document.getElementById('mainimageoverlay').style.display = 'block'
        document.getElementById('mainimagemodal').style.display = 'flex'
        document.getElementById('cropsavebtn').style.display = 'block'
         cropper = new Cropper(mainmodimg,{
            aspectRatio:1/1,
            viewMode:2,
            scalable:false
        })
        document.getElementById('cropsavebtn').addEventListener('click',()=>{
        console.log(cropper.getData())
        document.getElementById('cropvaluesmain').value = JSON.stringify(cropper.getData())
        console.log(cropper.getCroppedCanvas().toDataURL())
        mainpre.src = cropper.getCroppedCanvas().toDataURL()
        document.getElementById('mainimageoverlay').style.display = 'none'
        document.getElementById('mainimagemodal').style.display = 'none'
        document.getElementById('cropsavebtn').style.display = 'none'

        })
        document.querySelectorAll('.closecrop').forEach(el=>{
            el.addEventListener('click',()=>{
                document.getElementById('mainimageoverlay').style.display = 'none'
                document.getElementById('mainimagemodal').style.display = 'none'
                document.getElementById('cropsavebtn').style.display = 'none'

            })
        })
    })
    }
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
    let  i = 0
    if(files && files.length === 4)
    {
        for(let element of files) {
           
        const reader = new FileReader()

        reader.onload = function (e)
        {   
            
            const imgpre = document.createElement('img')
            imgpre.src = ""
            imgpre.src = e.target.result
            imgpre.id = `img${i+1}`
            imgpre.style.width = "200px"
            imgpre.style.height = "200px"
            preview2.appendChild(imgpre)
           i++ 

        }

        reader.readAsDataURL(element)
    };
    for(let i = 0 ; i < files.length ; i++){
        const imgcrop = document.createElement('button')
        imgcrop.type = "button"
        imgcrop.innerHTML = "CROP"
        imgcrop.id = `imgcropbtn${i+1}`
        imgcrop.classList.add = 'imgcrop'
        preview2.appendChild(imgcrop)
    }

    function saveImgData(){
    
        document.getElementById('mainimageoverlay').style.display = 'none'
        document.getElementById('mainimagemodal').style.display = 'none'
        if(document.getElementById('cropsavebtn1')){
            document.getElementById('cropsavebtn1').style.display = 'none'
        }
        if(document.getElementById('cropsavebtn2')){
            document.getElementById('cropsavebtn2').style.display = 'none'
        }
        if(document.getElementById('cropsavebtn3')){
            document.getElementById('cropsavebtn3').style.display = 'none'
        }
        if(document.getElementById('cropsavebtn4')){
            document.getElementById('cropsavebtn4').style.display = 'none'
        }

    }
    function cropperInit(){
        if(cropper1){
            cropper1.destroy()
        }
        if(cropper){
            cropper.destroy()
        }
        cropper1 = new Cropper(mainmodimg,{
            aspectRatio:1/1,
            viewMode:2,
            scalable:false
        })
        return cropper1
    }
    const cropvaluesimg1 = document.getElementById('cropvaluesimg1')
    const cropvaluesimg2 = document.getElementById('cropvaluesimg2')
    const cropvaluesimg3 = document.getElementById('cropvaluesimg3')
    const cropvaluesimg4 = document.getElementById('cropvaluesimg4')

    const imgcropbtn1 = document.getElementById('imgcropbtn1')
    imgcropbtn1.addEventListener('click',()=>{

        mainmodimg.src = document.getElementById('img1').src
        document.getElementById('mainimageoverlay').style.display = 'block'
        document.getElementById('mainimagemodal').style.display = 'flex'
        document.getElementById('cropsavebtn1').style.display = 'block'
        const crop = cropperInit()
        document.getElementById('cropsavebtn1').addEventListener('click',()=>{
        document.getElementById('img1').src = crop.getCroppedCanvas().toDataURL()
        cropvaluesimg1.value = JSON.stringify(crop.getData())
        saveImgData()
        
    })

    })
    const imgcropbtn2 = document.getElementById('imgcropbtn2')
    imgcropbtn2.addEventListener('click',()=>{
        mainmodimg.src = document.getElementById('img2').src
        document.getElementById('mainimageoverlay').style.display = 'block'
        document.getElementById('mainimagemodal').style.display = 'flex'
        document.getElementById('cropsavebtn2').style.display = 'block'
        const crop = cropperInit()
        document.getElementById('cropsavebtn2').addEventListener('click',()=>{
            document.getElementById('img2').src = crop.getCroppedCanvas().toDataURL()
            cropvaluesimg2.value = JSON.stringify(crop.getData())
            saveImgData()})

    })
    const imgcropbtn3 = document.getElementById('imgcropbtn3')
    imgcropbtn3.addEventListener('click',()=>{
        mainmodimg.src = document.getElementById('img3').src
        document.getElementById('mainimageoverlay').style.display = 'block'
        document.getElementById('mainimagemodal').style.display = 'flex'
        document.getElementById('cropsavebtn3').style.display = 'block'
        const crop = cropperInit()
        document.getElementById('cropsavebtn3').addEventListener('click',()=>{
            document.getElementById('img3').src = crop.getCroppedCanvas().toDataURL()
            cropvaluesimg3.value = JSON.stringify(crop.getData())
            saveImgData()})

    })
    const imgcropbtn4 = document.getElementById('imgcropbtn4')
    imgcropbtn4.addEventListener('click',()=>{
        mainmodimg.src = document.getElementById('img4').src
        document.getElementById('mainimageoverlay').style.display = 'block'
        document.getElementById('mainimagemodal').style.display = 'flex'
        document.getElementById('cropsavebtn4').style.display = 'block'
        const crop = cropperInit()
        document.getElementById('cropsavebtn4').addEventListener('click',()=>{
            document.getElementById('img4').src = crop.getCroppedCanvas().toDataURL()
            cropvaluesimg4.value = JSON.stringify(crop.getData())
            saveImgData()})

    })
    document.querySelectorAll('.closecrop').forEach(el=>{
        el.addEventListener('click',()=>{
            mainmodimg.src = ""
            document.getElementById('mainimageoverlay').style.display = 'none'
            document.getElementById('mainimagemodal').style.display = 'none'
            if(document.getElementById('cropsavebtn1')){
                document.getElementById('cropsavebtn1').style.display = 'none'
            }
            if(document.getElementById('cropsavebtn2')){
                document.getElementById('cropsavebtn2').style.display = 'none'
            }
            if(document.getElementById('cropsavebtn3')){
                document.getElementById('cropsavebtn3').style.display = 'none'
            }
            if(document.getElementById('cropsavebtn4')){
                document.getElementById('cropsavebtn4').style.display = 'none'
            }
        })
    })
    }
}



imgs.addEventListener('change',(e)=>{
    loadMain1(e,preview2)

})

