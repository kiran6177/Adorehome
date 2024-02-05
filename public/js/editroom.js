const roomname = document.getElementById('roomname')
const roomform = document.getElementById('roomform')
const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')
const roomimage = document.getElementById('roomimage')

function notnull(data)
{
    if(data.trim()==="")
    {
        error1.innerHTML = "Please Enter Room Name."
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

roomname.addEventListener('keyup',()=>{
    const cdata = roomname.value
    notnull(cdata)
})
roomname.addEventListener('blur',()=>{
    const cdata = roomname.value
    notnull(cdata)
})

roomimage.addEventListener('change',()=>{
    const mdata = roomimage.files.length
    const mmtype = roomimage.files[0].type
    console.log(mmtype)
    mainval(mdata,mmtype)
})

roomform.addEventListener('submit',(e)=>{

    const cdata = roomname.value
    const mdata = roomimage.files.length
    let mmtype
    if(mdata != 0){
         mmtype = roomimage.files[0].type
        mainval(mdata,mmtype)
        }
    notnull(cdata)

    if(error1.innerHTML !== "" || error2.innerHTML !=="")
    {
        e.preventDefault()
    }
})