const catname = document.getElementById('catname')
const catform = document.getElementById('catform')
const error1 = document.getElementById('error1')

function notnull(data)
{
    if(data.trim()==="")
    {
        error1.innerHTML = "Please Enter Category Name."
        error1.style.display = "block"
    }
    else{
        error1.innerHTML = ""
        error1.style.display = "none"
    }
}



catname.addEventListener('keyup',()=>{
    const cdata = catname.value
    notnull(cdata)
})
catname.addEventListener('blur',()=>{
    const cdata = catname.value
    notnull(cdata)
})



catform.addEventListener('submit',(e)=>{

    const cdata = catname.value

    notnull(cdata)

    if(error1.innerHTML !== "")
    {
        e.preventDefault()
    }
})