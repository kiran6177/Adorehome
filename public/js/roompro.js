
const addtocart = document.querySelectorAll('#addcartbtn')

function addCart(proid,qty)
{
    fetch(`/cart/addcart?proid=${proid}&qty=${qty}`)
    .then(res =>{
        return res.json()    
    })
    .then(data =>{
        if(data.data)
        {
            Swal.fire({
            title: data.data,
            icon: "success",
            confirmButtonText:"OK"
            })
            .then(res=>{
                if(res.isConfirmed)
                {
                    window.location.reload()
                }
            })

        }
        else if(data.stockerr)
        {
            Swal.fire({
                title: "Out Of Stock",
                icon: "error"
                })
        }
        else if(data.err){
            Swal.fire({
                title: data.err,
                icon: "warning",
                confirmButtonText:"OK"
                })
                .then(res=>{
                    if(res.isConfirmed)
                    {
                        window.location.reload()
                    }
                })  
        }
    })
    .catch(err=>{
        window.location.href = '/login'
    })
}

addtocart.forEach(el =>{
    el.addEventListener('click',function(){
        let proid = this.dataset.proid
        let qty = 1
        console.log(proid)
        addCart(proid,qty)
    })
})

const pgmain = document.getElementById('pgmain')
let totalproductscount = document.getElementById('totalproductscount')
let totalproductpages = Math.ceil(totalproductscount.value / 8)
const usearch = document.getElementById('usearch')
const usearchbtn = document.getElementById('usearchbtn')
const profilter = document.getElementById('profilter')

usearchbtn.addEventListener('click',()=>{
    let searchvalue = usearch.value
    let roomid = document.getElementById('roomid').value
    closebtn.click()
    console.log("Se"+searchvalue)
    proSearch(searchvalue,roomid)
})

profilter.addEventListener('change',()=>{
    let filtervalue = profilter.value
    let searchvalue = usearch.value
    let roomid = document.getElementById('roomid').value
    console.log("Se in F"+roomid)
    console.log(filtervalue)
    fetchFiltered(searchvalue,filtervalue,roomid)
})

async function fetchFiltered(search,filter,roomid){
    try {
        const res = await fetch(`/products/filterpro?search=${search}&filter=${filter}&roomid=${roomid}`)
        const data = await res.json()
        if(data.products){

            injection(data)
            // totalproductpages = Math.ceil(data.procount / 8)
        }else{
          injection1()
        }
    } catch (error) {
        console.log(error.message)
        window.location.href = '/login'

    }
}

async function proSearch(usearch,roomid)
{
    try{
    const res = await fetch(`/products/searchpro?search=${usearch}&roomid=${roomid}`)
    const data = await res.json()
    if(data.products)
    {
        injection(data)
        totalproductpages = Math.ceil(data.procount / 8)
    }
    else{
      injection1()
    }
    }
    catch(error){
        console.log(error.message)
        window.location.href = '/login'
    }
}

// async function nextProductPage(page)
// {
//     try {
//         let filtervalue = profilter.value
//         let searchvalue = usearch.value
//         const res = await fetch(`/products/searchfilterpage?page=${page}&filter=${filtervalue}&search=${searchvalue}`)
//         const data = await res.json()
//         if(data.products){
//             console.log(data)
//             injection(data)
//             totalproductpages = Math.ceil(data.procount / 8)
//             productPageLoop(totalproductpages,page)

//         }else{
//           injection1()
//         }
//     } catch (error) {
//         // window.location.href = '/login'
//         console.log(error.message)
//     }
// }


// function productPageLoop(totalproductpages, currentPage) {
//     let beforepage = currentPage - 1;
//     let afterpage = currentPage + 1;
//     console.log("totW"+totalproductpages)
//     let active;
  
//     if (currentPage === totalproductpages && totalproductpages != 1) {
//       pgmain.innerHTML = "";
//       pgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextProductPage(${
//         currentPage - 1
//       })"><i class="fa-solid fa-chevron-left"></i></button>`;
//       if (totalproductpages < 4) {
//         for (let i = beforepage; i <= currentPage; i++) {
//           if (currentPage === i) {
//             active = "selectedbtn";
//           } else {
//             active = "";
//           }
//           pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextProductPage(${i})">${i}</button>`;
//         }
//       } else {
//         for (let i = beforepage - 2; i <= currentPage; i++) {
//           if (currentPage === i) {
//             active = "selectedbtn";
//           } else {
//             active = "";
//           }
//           pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextProductPage(${i})">${i}</button>`;
//         }
//       }
  
//       if (currentPage != totalproductpages) {
//         pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextProductPage(${
//           currentPage + 1
//         })"><i class="fa-solid fa-angle-right"></i></button>`;
//       }
//     } else if (currentPage === 1) {
//       pgmain.innerHTML = "";
  
//       if (totalproductpages > 2) {
//         for (let i = beforepage; i <= afterpage + 2; i++) {
//           if (currentPage === i) {
//             active = "selectedbtn";
//           } else {
//             active = "";
//           }
//           if (i == 0) {
//             continue;
//           }
//           pgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextProductPage(${i})">${i}</button>`;
//         }
//       } else {
//         for (let i = beforepage; i < afterpage; i++) {
//           if (currentPage === i) {
//             active = "selectedbtn";
//           } else {
//             active = "";
//           }
//           if (i == 0) {
//             continue;
//           }
//           pgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextProductPage(${i})">${i}</button>`;
//         }
//       }
//       if (currentPage != totalproductpages) {
//         pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextProductPage(${
//           currentPage + 1
//         })"><i class="fa-solid fa-angle-right"></i></button>`;
//       } else {
//         pgmain.innerHTML += "";
//       }
//     } else if (currentPage > 1) {
//       pgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextProductPage(${
//         currentPage - 1
//       })"><i class="fa-solid fa-chevron-left"></i></button>`;
//       for (let i = beforepage; i <= afterpage; i++) {
//         if (currentPage === i) {
//           active = "selectedbtn";
//         } else {
//           active = "";
//         }
//         pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextProductPage(${i})">${i}</button>`;
//       }
//       if (currentPage != totalproductpages) {
//         pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextProductPage(${
//           currentPage + 1
//         })"><i class="fa-solid fa-angle-right"></i></button>`;
//       } else {
//         pgmain.innerHTML += "";
//       }
//     }
  
//     console.log(currentPage);
//   }

//   productPageLoop(totalproductpages,1)


  function injection(data){
    const newpro  = document.querySelectorAll('.newpro')
    if(newpro){
        newpro.forEach(el=>el.remove())
    }
    const product = document.querySelectorAll('.product')
    const productsdiv = document.getElementById('productsdiv')

     product.forEach(el=>el.remove())
     if(data.products.length > 0)
     {
        
        for(let i = 0; i < data.products.length ; i++){
            const newdiv = document.createElement('div')
            newdiv.classList.add('product', 'product1', 'col-md-3', 'mt-4' , 'newpro')
            let pname = data.products[i].productname.split(' ')[0]
            let desc = data.products[i].description.split('.')[0] 
            const newdiv1 = document.createElement('div')
            newdiv1.classList.add('card')
            newdiv1.innerHTML = `
            <a href="/products/viewproduct?id=${data.products[i]._id }"><img src="/assets/${data.products[i].mainimage }" class="card-img-top" alt="..."></a>
            <div class="card-body">
              <h5 class="card-title cardhead">${pname}</h5>
              <div class="carddesc"><p class="card-text">${desc}</p></div>
              <div class="cardprice"><p class="card-text ">Rs.${data.products[i].price}</p></div>`
               let isListed = 0 
               if(data.udata.wishlist.length > 0) { data.udata.wishlist.forEach(element => { 
                console.log(element.product_id)
                console.log(data.products[i]._id)

                if(element.product_id == data.products[i]._id) { isListed = 1 }
              });}
              if(isListed == 1){
                newdiv1.innerHTML += `<div class="wishiconsolid3 " data-proid="${data.products[i]._id}"><i class="fa-solid fa-heart"></i></div>`
              }else{
                newdiv1.innerHTML += `<div class="wishicon3 " data-proid="${data.products[i]._id}"><i class="fa-regular fa-heart"></i></div>`
             } 
            newdiv1.innerHTML +=  `<div class="addcart"><button type="button" id="addcartbtn" data-proid="${data.products[i]._id }"><i class="fa-solid fa-cart-plus"></i></button></div>`
            newdiv1.innerHTML += `</div>`
            if(data.products[i].offer_id != "NA" && data.products[i].offerdata && data.products[i].offerdata.length > 0){
              newdiv1.innerHTML += `<div class="offervalue">${data.products[i].offerdata[0].discount}%</div>`
            }
            newdiv.appendChild(newdiv1)
        productsdiv.appendChild(newdiv)
        }
     }
     productsdiv.addEventListener('click', function(event) {

      const wishIconElement = event.target.closest('.wishiconsolid3');
      const wishElement = event.target.closest('.wishicon3');
      const addcartelement = event.target.closest('#addcartbtn')
      if (wishIconElement) {
          const proid = wishIconElement.getAttribute('data-proid');
          const removed =  removeWishlist(proid)
          if(removed){
            window.location.reload()
            }
      }
      if(addcartelement){
        const proid = addcartelement.getAttribute('data-proid');
        addCart(proid,1)
      }
      if(wishElement){
        const proid = wishElement.getAttribute('data-proid');
        const added =  addWishlist(proid)
        if(added){
          window.location.reload()
          }
      }
  });
  }

  function injection1(){
    const newpro  = document.querySelectorAll('.newpro')
    if(newpro){
        newpro.forEach(el=>el.remove())
    }
    const product = document.querySelectorAll('.product')
    const productsdiv = document.getElementById('productsdiv')

     product.forEach(el=>el.remove())
  
            const newdiv = document.createElement('div')
            newdiv.classList.add('product', 'product1', 'col-md-12', 'mt-4' , 'newpro')

            newdiv.innerHTML = `<div class="d-flex flex-column w-100 justify-content-center align-items-center"><div class="text-center">  <img src="/public/images/favicon.png" class="mx-auto" width="200rem" height="200rem" alt=""></div>
            <h2 class="text-center">NO PRODUCTS FOUND!!</h2>
            <button class="btn viewbtn my-4 text-center p-3"><a href="/products">View All Products</a></button></div>`
        productsdiv.appendChild(newdiv)

  }

  async function addWishlist(proid){
    try {
      const res = await fetch(`/wishlist/add?productid=${proid}`)
      const data = await res.json()
      if(data.success){
        return true
      }
      else{
        return false
      }
    } catch (error) {
      window.location.href = '/login'
      console.log(error.message)
    }
  }
  async function removeWishlist(proid){
    try {
      const res = await fetch(`/wishlist/rem?productid=${proid}`)
      const data = await res.json()
      if(data.success){
        return true
      }
      else{
        return false
      }
    } catch (error) {
      window.location.href = '/login'
      console.log(error.message)
    }
  }

const wishaddbtn = document.querySelectorAll('.wishicon3')
const wishiconsolid1  = document.querySelectorAll('.wishiconsolid3')

wishaddbtn.forEach(el=>{
    el.addEventListener('click',()=>{
        let proid = el.dataset.proid
        console.log(proid)
        const added =  addWishlist(proid)
        if(added){
          window.location.reload()
          }
    })
})

wishiconsolid1.forEach(el=>{
    el.addEventListener('click',()=>{
        let proid = el.dataset.proid
        console.log(proid)
        const removed =  removeWishlist(proid)
        if(removed){
          window.location.reload()
          }
    })
})

