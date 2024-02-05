const brandname = document.getElementById('brandname')
const brandform = document.getElementById('brandform')
const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')
const brandimage = document.getElementById('brandimage')

function notnull(data)
{
    if(data.trim()==="")
    {
        error1.innerHTML = "Please Enter Brand Name."
        error1.style.display = "block"
    }
    else{
        error1.innerHTML = ""
        error1.style.display = "none"
    }
}

function mainval(data,mmtype)
{
    if(data === 0)
    {
        error2.innerHTML = "Please select an Image."
        error2.style.display = "block"
    }
    else if(!mmtype.startsWith('image/'))
    {
        error2.innerHTML = "Please select Image Files Only."
        error2.style.display = "block"
    }
    else{
        error2.innerHTML = ""
        error2.style.display = "none"
    }
}

brandname.addEventListener('keyup',()=>{
    const cdata = brandname.value
    notnull(cdata)
})
brandname.addEventListener('blur',()=>{
    const cdata = brandname.value
    notnull(cdata)
})

brandimage.addEventListener('change',()=>{
    const mdata = brandimage.files.length
    const mmtype = brandimage.files[0].type
    console.log(mmtype)
    mainval(mdata,mmtype)
})

brandform.addEventListener('submit',(e)=>{

    const cdata = brandname.value
    const mdata = brandimage.files.length
    let mmtype
    if(mdata != 0){
         mmtype = brandimage.files[0].type
        }
    mainval(mdata,mmtype)
    notnull(cdata)

    if(error1.innerHTML !== "" || error2.innerHTML !=="")
    {
        e.preventDefault()
    }
})