const dailybtn = document.getElementById('dailybtn')
const weekbtn  = document.getElementById('weekbtn')
const monthbtn = document.getElementById('monthbtn')
const yearbtn = document.getElementById('yearbtn')
const dailybuttons = document.getElementById('dailybuttons')
const weekbuttons = document.getElementById('weekbuttons')
const monthbuttons = document.getElementById('monthbuttons')
const yearbuttons = document.getElementById('yearbuttons')

const dailybtn1 = document.getElementById('dailybtn1')
const weekbtn1  = document.getElementById('weekbtn1')
const monthbtn1 = document.getElementById('monthbtn1')
const yearbtn1 = document.getElementById('yearbtn1')
const dailybuttons1 = document.getElementById('dailybuttons1')
const weekbuttons1 = document.getElementById('weekbuttons1')
const monthbuttons1 = document.getElementById('monthbuttons1')
const yearbuttons1 = document.getElementById('yearbuttons1')

const Dday = document.getElementById('Dday')
const Dmonth = document.getElementById('Dmonth')
const Dyear = document.getElementById('Dyear')
const promaintable = document.querySelector('#promaintable tbody')
const protable = document.querySelectorAll('.protable')

async function fetchByDate(day,month,year)
{
    const res = await fetch(`/admin/salesreport/dailypro?day=${day}&month=${month}&year=${year}`)
    const data = await res.json()
    if(data.proSold.length > 0)
    {   
        const newdata = document.querySelectorAll('.newdata')
        if(newdata)
        {
            newdata.forEach(el=> el.remove())
        }
        protable.forEach(el=> el.remove())

        for(let i = 0;i < data.proSold.length; i++)
        {   
             console.log(data.proSold)
             const date = new Date(data.proSold[i].date)

             const monthno = date.getMonth()
             function getMonthName(data)
             {
                const monthNames = [
                    "January", "February", "March", "April",
                    "May", "June", "July", "August",
                    "September", "October", "November", "December"
                  ];
                  return monthNames[data]
             }
             let month = getMonthName(monthno)


            const newrow = document.createElement('tr')
            newrow.classList.add('newdata')
            newrow.innerHTML = `<td>${i+1}</td>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
            <td>${data.proSold[i].prodetails[0].productname }</td>
            <td>${data.proSold[i].products.qty}Pcs</td>
            <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            <td>Rs.${data.proSold[i].total_amount}</td>
            <td>${data.proSold[i].payment_method}</td>`

            promaintable.appendChild(newrow)
        }
    }
    else{
        const newdata = document.querySelectorAll('.newdata')
        if(newdata)
        {
            newdata.forEach(el=> el.remove())
        }
        protable.forEach(el=> el.remove())

        const newrow = document.createElement('tr')
        newrow.classList.add('newdata')
        newrow.innerHTML = "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>"
        promaintable.appendChild(newrow)

    }
}

Dday.addEventListener('change',()=>{
    let day = Dday.value
    let month = Dmonth.value
    let year = Dyear.value
    console.log(Dday.value)
    console.log(Dmonth.value)
    console.log(Dyear.value)
    fetchByDate(day,month,year)

})
Dmonth.addEventListener('change',()=>{
    let day = Dday.value
    let month = Dmonth.value
    let year = Dyear.value
    console.log(Dday.value)
    console.log(Dmonth.value)
    console.log(Dyear.value)
    fetchByDate(day,month,year)

})
Dyear.addEventListener('change',()=>{
    let day = Dday.value
    let month = Dmonth.value
    let year = Dyear.value
    console.log(Dday.value)
    console.log(Dmonth.value)
    console.log(Dyear.value)
    fetchByDate(day,month,year)

})

dailybtn.addEventListener('click',()=>{
    dailybuttons.style.display = "block"
    if(weekbuttons)
    {
        weekbuttons.style.display = 'none'
    }
    if(monthbuttons)
    {
        monthbuttons.style.display = 'none'
    }
    if(yearbuttons)
    {
        yearbuttons.style.display = 'none'
    }

})

weekbtn.addEventListener('click',()=>{
    weekbuttons.style.display = "block"
    if(monthbuttons)
    {
        monthbuttons.style.display = 'none'
    }
    if(yearbuttons)
    {
        yearbuttons.style.display = 'none'
    }
    if(dailybuttons)
    {
        dailybuttons.style.display = 'none'
    }
})

monthbtn.addEventListener('click',()=>{
    monthbuttons.style.display = "block"
    if(weekbuttons)
    {
        weekbuttons.style.display = 'none'
    }
    if(yearbuttons)
    {
        yearbuttons.style.display = 'none'
    }
    if(dailybuttons)
    {
        dailybuttons.style.display = 'none'
    }
})

yearbtn.addEventListener('click',()=>{
    yearbuttons.style.display = "block"
    if(monthbuttons)
    {
        monthbuttons.style.display = 'none'
    }
    if(weekbuttons)
    {
        weekbuttons.style.display = 'none'
    }
    if(dailybuttons)
    {
        dailybuttons.style.display = 'none'
    }
})


dailybtn1.addEventListener('click',()=>{
    dailybuttons1.style.display = "block"
    if(weekbuttons1)
    {
        weekbuttons1.style.display = 'none'
    }
    if(monthbuttons1)
    {
        monthbuttons1.style.display = 'none'
    }
    if(yearbuttons1)
    {
        yearbuttons1.style.display = 'none'
    }
})

weekbtn1.addEventListener('click',()=>{
    weekbuttons1.style.display = "block"
    if(monthbuttons1)
    {
        monthbuttons1.style.display = 'none'
    }
    if(yearbuttons1)
    {
        yearbuttons1.style.display = 'none'
    }
    if(dailybuttons1)
    {
        dailybuttons1.style.display = 'none'
    }
})

monthbtn1.addEventListener('click',()=>{
    monthbuttons1.style.display = "block"
    if(weekbuttons1)
    {
        weekbuttons1.style.display = 'none'
    }
    if(yearbuttons1)
    {
        yearbuttons1.style.display = 'none'
    }
    if(dailybuttons1)
    {
        dailybuttons1.style.display = 'none'
    }
})

yearbtn1.addEventListener('click',()=>{
    yearbuttons1.style.display = "block"
    if(monthbuttons1)
    {
        monthbuttons1.style.display = 'none'
    }
    if(weekbuttons1)
    {
        weekbuttons1.style.display = 'none'
    }
    if(dailybuttons1)
    {
        dailybuttons1.style.display = 'none'
    }
})