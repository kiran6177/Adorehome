const sendbtn = document.getElementById('sendOTP')
const resendbtn = document.getElementById('resendOTP')
const email = document.getElementById('email')
const timerview = document.getElementById('timerview')
const uid = document.getElementById('uid')
const error1 = document.getElementById('error1')




// function openModal() {
//     var myModal = new bootstrap.Modal(document.getElementById('myModal'));
//     myModal.show();
//   }


function send(uiddata){
    fetch(`http://localhost:3003/sendotp?uid=${uiddata}`)
.then((res)=>{
    return res.json()
}).then((data)=>{
    console.log(data.data)
    // openModal()
    if(data.data)
    {
        Swal.fire({
            title: data.data,
            icon: "success"
          });
    }

      if(data.err)
      {
          error1.style.display = "block"
          error1.innerHTML = data.err
      }
}).catch(err =>{
    console.log(err.message)
})
}



let seconds = 60

function showtime(){
    timerview.style.display = "block"
    timerview.innerHTML = `00 : ${seconds}`
}


function timer(){
    showtime()
    if(seconds>0)
    {
        seconds--
        setTimeout(timer,1000)

    }
    else{
    timerview.style.display = "none"
    resendbtn.style.display = "block"

    }
}

sendbtn.addEventListener('click',()=>{

    sendbtn.style.display = "none"
     let uiddata = uid.value
     console.log(uiddata+"on clicking send")
    timer()
    send(uiddata)

})

resendbtn.addEventListener('click',()=>{

    resendbtn.style.display = "none"
    error1.style.display = "none"
    const uidata =uid.value
    console.log(uidata)
    seconds = 60
    timer()
    send(uidata)

})

