const placeorder = document.getElementById("placeorder");

async function cancelOrder(oid)
{
    const res = await fetch(`/orders/cancelorder?oid=${oid}`)
    const data = await res.json()
    if(data.data)
    {
        Swal.fire({
            title:data.data,
            icon:"error",
            confirmButtonText:"OK"
        })
        .then(res=>{
            if(res.isConfirmed)
            {
                window.location.reload()
            }
        })
    }
    else if(data.err)
    {

    }
}


async function verifyPayment(paymentdetails,orderIdDB){
    try {
        const res = await fetch('/verifyPayment',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                razorPayId:paymentdetails.razorpay_payment_id,
                razorOrderId:paymentdetails.razorpay_order_id,
                razorSignature:paymentdetails.razorpay_signature,
                realOrderID:orderIdDB
            })
            }
        )
        const data = await res.json()
        if(data.success)
        {
            window.location.href = `/ordered?id=${data.success}`
        }else{
            Swal.fire({
                title:"Payment Failed!!",
                icon:"error",

            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

async function razorOrderAPI(orderid,amount,userdata,orderIdDB)
{
    try {
        var options = {
            "key": "rzp_test_F7iv5wIq3yEfS6", 
            "amount": amount, 
            "currency": "INR",
            "name": "AdoreHome",
            "description": "Test Transaction",
            "image": "/public/images/squarelogo.jpg",
            "order_id": orderid, 
            "handler": function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)

                verifyPayment(response,orderIdDB)
            },
            "prefill": {
                "name": userdata.firstname +" "+ userdata.lastname,
                "email": userdata.email,
                "contact": userdata.mobile
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#FF5B14"
            }
        };
        let rzp1 = new Razorpay(options);
        rzp1.open()
        rzp1.on('payment.failed', function (response){
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            console.log(response.error)
            Swal.fire({
                title: "PAYMENT FAILED!",
                text: "Try using Other Options",
                imageUrl: "/public/images/paymentfailed.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                confirmButtonText:"OK",
                showDenyButton:true,
                denyButtonText:"Cancel"
              })
              .then(res=>{
                if(res.isConfirmed)
                {
                    cancelOrder(orderIdDB)
                    window.location.reload()
                }
                if(res.isDenied)
                {
                    cancelOrder(orderIdDB)
                }
              })
        })
    } catch (error) {
        console.log(error.message)
    }
}

async function orderPlace(paymethod) {
  try {
    console.log("Orderplaced")
    const res = await fetch(`/placeorder?paymethod=${paymethod}`)
    const data = await res.json()
    console.log(data)
    if(data.cod)
    {
        window.location.href = `/ordered?id=${data.cod}`
    }
    else if(data.razorpay)
    {
        razorOrderAPI(data.razorpay.id,data.razorpay.amount,data.razorpay.userdata,data.razorpay.orderId)
    }
    else if(data.wallet)
    {

    }
  } catch (error) {
    window.location.href = '/login'
     console.log("Hello"+error);
  }
}

placeorder.addEventListener("click", (e) => {
  const payradio = document.querySelectorAll(".payradio");
  const isChecked = Array.from(payradio).some((el) => el.checked);
  const checkprodet = document.querySelector(".checkprodet");

  if (!isChecked) {
    e.preventDefault();
    Swal.fire({
      title: "Select any Payment Option.",
      icon: "info",
    });
  } else if (!checkprodet) {
    e.preventDefault();
    Swal.fire({
      title: "No Products Available.",
      icon: "error",
    });
  } else {
    let paymethodvalue;
    payradio.forEach((element) => {
      if (element.checked) {
        paymethodvalue = element.value;
      }
    });
    console.log(paymethodvalue)
    if (paymethodvalue !== undefined) {
        orderPlace(paymethodvalue);
    }
  }
});
