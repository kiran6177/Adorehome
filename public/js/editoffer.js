const deleteofferimg = document.getElementById('deleteofferimg')
const offerdataimg = document.getElementById('offerdataimg')
const plusbtn = document.getElementById('plusbtn')
const offerimage= document.getElementById('offerimage')

const offerdescription = document.getElementById('offerdescription')
const offertitle = document.getElementById('offertitle')
const offerpreview = document.getElementById('offerpreview')
const offerform = document.getElementById('offerform')


const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')
const error3 = document.getElementById('error3')

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
// function mainval(data,mmtype)
// {
//     if(data === 0)
//     {
//         error3.innerHTML = "Please select an Image."
//         error3.style.display = "block"
//     }
//     else if(!mmtype.startsWith('image/'))
//     {
//         error3.innerHTML = "Please select Image Files Only."
//         error3.style.display = "block"
//     }
//     else{
//         error3.innerHTML = ""
//         error3.style.display = "none"
//     }
// }
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
// offerimage.addEventListener('change',()=>{
//     const mdata = offerimage.files.length
//     const mmtype = offerimage.files.type
//     console.log(mmtype)
//     mainval(mdata,mmtype)
// })

offerform.addEventListener('submit',(e)=>{
    const pdata = offertitle.value
    const ddata = offerdescription.value
    const mtype = offerimage.files.type


    descval(ddata)
    pnameval(pdata)

    if(error1.innerHTML !=="" || error2.innerHTML !=="" || error3.innerHTML !=="" )
    {
        e.preventDefault()
    }
    
})

const croppeddata = document.getElementById('croppeddata')
deleteofferimg.addEventListener('click',()=>{
    offerdataimg.style.display = 'none'
    plusbtn.style.display = 'block'
})
if(plusbtn){
    plusbtn.addEventListener('click',()=>{
        offerimage.click()
        offerimage.addEventListener('change',(e)=>{
            const files = e.target.files
            if(files && files[0]){
                const reader = new FileReader()
                reader.onload = function (e){
                    plusbtn.style.display = 'none'
                    offerdataimg.src = e.target.result
                    offerdataimg.style.display = 'block'
                    const newcropbtn = document.createElement('button')
                    newcropbtn.type = 'button'
                    newcropbtn.id = 'cropbannerbtn'
                    newcropbtn.innerHTML = 'CROP'
                    offerpreview.appendChild(newcropbtn)
                    const cropper = new Cropper(offerdataimg,{
                        aspectRatio:4/3,
                        viewMode:2,
                        scalable:false
                    })
                    newcropbtn.addEventListener('click',()=>{
                        croppeddata.value = JSON.stringify(cropper.getData())
                        newcropbtn.innerHTML = "CROPPED"
                    })

                }

                reader.readAsDataURL(files[0])
            }
        })
    })
}