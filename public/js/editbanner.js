const deletebanner = document.getElementById('deletebanner')
const bannerdataimg = document.getElementById('bannerdataimg')
const plusbtn = document.getElementById('plusbtn')
const bannerimg= document.getElementById('bannerimg')

const bannerdescription = document.getElementById('bannerdescription')
const bannertitle = document.getElementById('bannertitle')
const bannerpreview = document.getElementById('bannerpreview')
const bannerform = document.getElementById('bannerform')


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
bannertitle.addEventListener('keyup',()=>{
    const pdata = bannertitle.value
    pnameval(pdata)
})
bannertitle.addEventListener('blur',()=>{
    const pdata = bannertitle.value
    pnameval(pdata)
})

bannerdescription.addEventListener('keyup',()=>{
    const ddata = bannerdescription.value
    descval(ddata)
})
bannerdescription.addEventListener('blur',()=>{
    const ddata = bannerdescription.value
    descval(ddata)
})
bannerimg.addEventListener('change',()=>{
    const mdata = bannerimg.files.length
    const mmtype = bannerimg.files.type
    console.log(mmtype)
    mainval(mdata,mmtype)
})

bannerform.addEventListener('submit',(e)=>{
    const pdata = bannertitle.value
    const ddata = bannerdescription.value
    const mtype = bannerimg.files.type


    descval(ddata)
    pnameval(pdata)

    if(error1.innerHTML !=="" || error2.innerHTML !=="" || error3.innerHTML !=="" )
    {
        e.preventDefault()
    }
    
})

const croppeddata = document.getElementById('croppeddata')
deletebanner.addEventListener('click',()=>{
    bannerdataimg.style.display = 'none'
    plusbtn.style.display = 'block'
})
if(plusbtn){
    plusbtn.addEventListener('click',()=>{
        bannerimg.click()
        bannerimg.addEventListener('change',(e)=>{
            const files = e.target.files
            if(files && files[0]){
                const reader = new FileReader()
                reader.onload = function (e){
                    plusbtn.style.display = 'none'
                    bannerdataimg.src = e.target.result
                    bannerdataimg.style.display = 'block'
                    const newcropbtn = document.createElement('button')
                    newcropbtn.type = 'button'
                    newcropbtn.id = 'cropbannerbtn'
                    newcropbtn.innerHTML = 'CROP'
                    bannerpreview.appendChild(newcropbtn)
                    const cropper = new Cropper(bannerdataimg,{
                        aspectRatio:16/9,
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