
const blockbtn = document.querySelectorAll('#blockbtn1')
const unblockbtn = document.querySelectorAll('#unblockbtn1')


function block(id){

    fetch(`http://localhost:3003/admin/users/blockuser?id=${id}`)
    .then(res=>{
        return res.json()
    })
    .then( data =>{
        if(data)
        {   
            if(data.blocked)
            {
                Swal.fire({
                    title: data.blocked,
                    icon: "warning",
                    confirmButtonText:"OK"
                }).then(res=>{
                  if(res.isConfirmed)
                  {
                      window.location.reload()
                  }

                })
            }
            else{
                Swal.fire({
                    title: data.err,
                    icon: "error",
                    confirmButtonText:"OK"
                }).then(res=>{
                  if(res.isConfirmed)
                  {
                      window.location.href = "http://localhost:3003/admin/users"
                  }
                })
            }
            
        }
        else{
            console.log("Can't Delete")
        }
    })
    .catch(err=>{
        window.location.href = '/login'
    })
}

function unblock(id){

    fetch(`http://localhost:3003/admin/users/unblockuser?id=${id}`)
    .then(res=>{
        return res.json()
    })
    .then( data =>{
        if(data)
        {   
            if(data.unblocked)
            {
                Swal.fire({
                    title: data.unblocked,
                    icon: "warning",
                    confirmButtonText:"OK"
                  }).then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.reload()
                    }

                  })
                  
                 
            }
            else{
                Swal.fire({
                    title: data.err,
                    icon: "error",
                    confirmButtonText:"OK"
                  }).then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.href = "http://localhost:3003/admin/users"
                    }
                  })
            }
            
        }
        else{
            console.log("Can't Delete")
        }
    })
    .catch(err=>{
        window.location.href = '/login'
    })
}
if(blockbtn){
    blockbtn.forEach(el =>{
        el.addEventListener('click',()=>{
            const id = el.dataset.uid

            Swal.fire({
                title:"Are you Sure ??",
                icon:"info",
                showDenyButton:true,
                showConfirmButton:true,
                confirmButtonText:"Block",
                denyButtonText:"Cancel"
            }).then(res=>{
                if(res.isConfirmed)
                {
                   block(id)
                }
                else if(res.isDenied)
                {
                    window.location.reload()
                }
            })
    })
    })
}

if(unblockbtn){
    unblockbtn.forEach(el =>{
        el.addEventListener('click',()=>{
            // console.log("called 0")
            const id = el.dataset.uid
            Swal.fire({
                title:"Are you Sure ??",
                icon:"info",
                showDenyButton:true,
                showConfirmButton:true,
                confirmButtonText:"Unblock",
                denyButtonText:"Cancel"
            }).then(res=>{
                if(res.isConfirmed)
                {
                   unblock(id)
                }
                else if(res.isDenied)
                {
                    window.location.reload()
                }
            })
    })

    })
}



const totalusercount = document.getElementById('totalusercount')
const usersearch = document.getElementById('usersearch')
const pgmain = document.getElementById('pgmain')
const usertable1 = document.querySelector('#usertable1 tbody')
const userrow = document.querySelectorAll('.userrow')
const usertable2 = document.querySelector('#usertable2')
let totaluserpages = 1
if(totalusercount)
{
    totaluserpages = Math.ceil(totalusercount.value / 8)
}

async function nextUserPage(page)
{
    try{
        console.log("working")
    let usersearchvalue = usersearch ? usersearch.value : null
    let res
    console.log("hoho"+usersearch.value)
    if(usersearchvalue)
    {
     res = await fetch(`/admin/users/page?search=${usersearchvalue}&page=${page}`)
    }else{
        console.log('hello')
     res = await fetch(`/admin/users/page?page=${page}`)
    }
    console.log("ADMIN USER")
    const data = await res.json()
    if(data.udata.length > 0)
    {
        const newdata = document.querySelectorAll('.newdata')
        if(newdata)
        {
            newdata.forEach(el=>el.remove())
        }

        userrow.forEach(el=>el.remove())
        for(let i = 0 ; i < data.udata.length ; i++){
            const newrow = document.createElement('tr')
            newrow.classList.add('newdata')
            newrow.innerHTML = `<td>${ data.udata[i].firstname  } ${ data.udata[i].lastname }</td>
            <td>${ data.udata[i].email }</td>
            <td>${ data.udata[i].mobile }</td>
            <td>Rs.500</td>
            `
            
             if(data.udata[i].isActive == 1) {     
            newrow.innerHTML +=`<td><button type="button" class="btn btn-outline-warning" id="blockbtn1" data-uid="${ data.udata[i]._id }">Block</button>&nbsp; &nbsp;<a href="/admin/users/deleteuser?id=${ data.udata[i]._id }"><button class="btn btn-outline-danger" >Delete</button></a></td>`
                 } else { 
             newrow.innerHTML +=  `<td><button type="button" class="btn btn-outline-info" id="unblockbtn1" data-uid="${ data.udata[i]._id }">Unblock</button>
                &nbsp; &nbsp;<a href="/admin/users/deleteuser?id=${ data.udata[i]._id }"><button class="btn btn-outline-danger" >Delete</button></a></td>`
            } 
              
            usertable1.appendChild(newrow)
        }

        usertable2.innerHTML = ''
        const newtbody = document.createElement('tbody')
        newtbody.classList.add('newdata')
        for(let i = 0; i<data.udata.length ; i++){
            newtbody.innerHTML += ` <tr><th>Name</th><td>${data.udata[i].firstname}${ data.udata[i].lastname }</td></tr>
            <tr><th>E-mail</th><td>${ data.udata[i].email}</td></tr>
            <tr><th>Mobile</th><td>${data.udata[i].mobile }</td></tr>
            <tr><th>Wallet</th><td>Rs.500</td></tr>
            `
            if(data.udata[i].isActive == 1) {                    
             newtbody.innerHTML += `<tr><th>Options</th><td><button type="button" class="btn btn-outline-warning" id="blockbtn1" data-uid="${data.udata[i]._id }">Block</button>&nbsp; &nbsp;<a href="/admin/users/deleteuser?id=${ data.udata[i]._id}"><button class="btn btn-outline-danger" >Delete</button></a></td></tr><tr><td></td><td></td></tr>`
            } else { 
             newtbody.innerHTML +=  `<tr><th>Options</th><td><button type="button" class="btn btn-outline-info" id="unblockbtn1" data-uid="${ data.udata[i]._id}">Unblock</button> &nbsp; &nbsp;<a href="/admin/users/deleteuser?id=${ data.udata[i]._id}"><button class="btn btn-outline-danger" >Delete</button></a></td></tr><tr><td></td><td></td></tr>`
            } 
                
        }
        usertable2.appendChild(newtbody)
        userPageLoop(totaluserpages,page)
        console.log(data)
    }
    else{

    }}
    catch(error){
        console.log(error.message)
    }
}

function userPageLoop(totaluserpages, currentPage) {
    let beforepage = currentPage - 1;
    let afterpage = currentPage + 1;
    console.log("totW"+totaluserpages)
    let active;
  
    if (currentPage === totaluserpages && totaluserpages != 1) {
      pgmain.innerHTML = "";
      pgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextUserPage(${
        currentPage - 1
      })"><i class="fa-solid fa-chevron-left"></i></button>`;
      if (totaluserpages < 4) {
        for (let i = beforepage; i <= currentPage; i++) {
          if (currentPage === i) {
            active = "selectedbtn";
          } else {
            active = "";
          }
          pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextUserPage(${i})">${i}</button>`;
        }
      } else {
        for (let i = beforepage - 2; i <= currentPage; i++) {
          if (currentPage === i) {
            active = "selectedbtn";
          } else {
            active = "";
          }
          pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextUserPage(${i})">${i}</button>`;
        }
      }
  
      if (currentPage != totaluserpages) {
        pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextUserPage(${
          currentPage + 1
        })"><i class="fa-solid fa-angle-right"></i></button>`;
      }
    } else if (currentPage === 1) {
      pgmain.innerHTML = "";
  
      if (totaluserpages > 2) {
        for (let i = beforepage; i <= afterpage + 2; i++) {
          if (currentPage === i) {
            active = "selectedbtn";
          } else {
            active = "";
          }
          if (i == 0) {
            continue;
          }
          pgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextUserPage(${i})">${i}</button>`;
        }
      } else {
        for (let i = beforepage; i < afterpage; i++) {
          if (currentPage === i) {
            active = "selectedbtn";
          } else {
            active = "";
          }
          if (i == 0) {
            continue;
          }
          pgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextUserPage(${i})">${i}</button>`;
        }
      }
      if (currentPage != totaluserpages) {
        pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextUserPage(${
          currentPage + 1
        })"><i class="fa-solid fa-angle-right"></i></button>`;
      } else {
        pgmain.innerHTML += "";
      }
    } else if (currentPage > 1) {
      pgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextUserPage(${
        currentPage - 1
      })"><i class="fa-solid fa-chevron-left"></i></button>`;
      for (let i = beforepage; i <= afterpage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextUserPage(${i})">${i}</button>`;
      }
      if (currentPage != totaluserpages) {
        pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextUserPage(${
          currentPage + 1
        })"><i class="fa-solid fa-angle-right"></i></button>`;
      } else {
        pgmain.innerHTML += "";
      }
    }
  
    console.log(currentPage);
  }

  userPageLoop(totaluserpages,1)