const clipbtn = document.querySelectorAll('.clipbtn')

clipbtn.forEach(el=>{
    el.addEventListener('click',(event)=>{
        const code = el.closest('.coupondiv').querySelector('.couponcode').innerHTML
         async function copiedText(code){
            try {
                 const datacopied = await navigator.clipboard.writeText(code)
                 console.log(datacopied)
                 Swal.fire({
                    title: "Copied To Clipboard.",
                    imageUrl: "/public/images/—Pngtree—vector copy icon_4013516.png",
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    confirmButtonText:"OK",
                  })
            } catch (error) {
                console.log(error.message)
            }
        }
        copiedText(code)

    })
})