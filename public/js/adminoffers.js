const offerimage = document.getElementById('offerimage')
const offerdescription = document.getElementById('offerdescription')
const offertitle = document.getElementById('offertitle')
const percentage = document.getElementById('percentage')

const offerpreview = document.getElementById('offerpreview')
const offerform = document.getElementById('offerform')


const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')
const error3 = document.getElementById('error3')
const error4 = document.getElementById('error4')


function pnameval(data)
{
    if(data.trim()==="")
    {
        error1.innerHTML = "Please Enter Banner title."
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

function discval(data)
{
    const nonNegPattern = /^\d+$/;

    if(data.trim()==="")
    {
        error3.innerHTML = "Please Enter Discount."
        error3.style.display = "block"
    }
    else if(!nonNegPattern.test(data) && parseInt(data) <= 100)
    {
        error3.innerHTML = "Please Enter Valid Discount."
        error3.style.display = "block"
    }
    else{
        error3.innerHTML = ""
        error3.style.display = "none"
    }
}
function mainval(data,mmtype)
{
    if(data === 0)
    {
        error4.innerHTML = "Please select an Image."
        error4.style.display = "block"
    }
    else if(!mmtype.startsWith('image/'))
    {
        error4.innerHTML = "Please select Image Files Only."
        error4.style.display = "block"
    }
    else{
        error4.innerHTML = ""
        error4.style.display = "none"
    }
}
offertitle.addEventListener('keyup',()=>{
    const pdata = offertitle.value
    pnameval(pdata)
})
offertitle.addEventListener('blur',()=>{
    const pdata = offertitle.value
    pnameval(pdata)
})

offerdescription.addEventListener('keyup',()=>{
    const ddata = offerdescription.value
    descval(ddata)
})
offerdescription.addEventListener('blur',()=>{
    const ddata = offerdescription.value
    descval(ddata)
})
percentage.addEventListener('keyup',()=>{
    const pdata = percentage.value
    discval(pdata)
})
percentage.addEventListener('blur',()=>{
    const pdata = percentage.value
    discval(pdata)
})
offerimage.addEventListener('change',()=>{
    const mdata = offerimage.files.length
    const mmtype = offerimage.files[0].type
    console.log(mmtype)
    mainval(mdata,mmtype)
})

offerform.addEventListener('submit',(e)=>{
    const pdata = offertitle.value
    const ddata = offerdescription.value
    const mdata = offerimage.files.length
    let mtype
    if(mdata != 0){
         mtype = offerimage.files.type

    }
    const pedata = percentage.value
    discval(pedata)
    console.log("ent")
    mainval(mdata,mtype)
    descval(ddata)
    pnameval(pdata)

    if(error1.innerHTML !=="" || error2.innerHTML !=="" || error3.innerHTML !=="" || error4.innerHTML !== "")
    {
        e.preventDefault()
    }
})

offerimage.addEventListener('change',(e)=>{
    const files = e.target.files
    const newimgdata = document.querySelector('#offerimgpre')
    if(newimgdata){
        newimgdata.remove()
    }
    if(files && files[0]){
        const reader = new FileReader()

        reader.onload = function(e){
            const newimg = document.createElement('img')
            newimg.src = e.target.result
            newimg.id = "offerimgpre"
            offerpreview.appendChild(newimg)
            const newcropbtn = document.createElement('button')
            newcropbtn.type = 'button'
            newcropbtn.id = 'cropbannerbtn'
            newcropbtn.innerHTML = 'CROP'
            offerpreview.appendChild(newcropbtn)
           const offerimgpre = document.getElementById('offerimgpre')
           console.log(offerimgpre)
            let cropper = new Cropper(offerimgpre,{
                aspectRatio:4/3,
                viewMode:2,
                scalable:false
            })
            newcropbtn.addEventListener('click',()=>{
                document.getElementById('croppeddata').value = JSON.stringify(cropper.getData())
                newcropbtn.innerHTML = "CROPPED"
            })
        }
        reader.readAsDataURL(files[0])
    }
})