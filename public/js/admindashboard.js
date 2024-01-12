const weekbtn = document.getElementById('weekbtn')
const monthbtn = document.getElementById('monthbtn')
const yearbtn = document.getElementById('yearbtn')
const weekchart = document.getElementById('weekchart')
const monthchart = document.getElementById('monthchart')
const yearchart = document.getElementById('yearchart')

async function weekReport()
{
    try {
        console.log("weekreport")
        const res = await fetch('/admin/home/weekreport')
        const data = await res.json()
        if(data.success)
        {

        }
        else{
            Swal.fire({
                title:"Week Data not available",
                imageUrl: "/public/images/paymentfailed.png",
                imageWidth: 200,
                imageHeight: 200,
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}


async function monthReport()
{
    try {
        console.log("monthreport")
        const res = await fetch('/admin/home/monthreport')
        const data = await res.json()
        if(data.success)
        {

        }
        else{
            Swal.fire({
                title:"Month Data not available",
                imageUrl: "/public/images/paymentfailed.png",
                imageWidth: 200,
                imageHeight: 200,
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}


async function yearReport()
{
    try {
        console.log("yearreport")
        const res = await fetch('/admin/home/yearreport')
        const data = await res.json()
        if(data.success)
        {

        }
        else{
            Swal.fire({
                title:"Year Data not available",
                imageUrl: "/public/images/paymentfailed.png",
                imageWidth: 200,
                imageHeight: 200,
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

window.onload = function()
{
    weekReport()
}

weekbtn.addEventListener('click',()=>{
  
  if(monthchart)
  {
      monthchart.style.display = "none"
  }
  if(yearchart)
  {
      yearchart.style.display = 'none'
  }
  weekchart.style.display = "block"
})

monthbtn.addEventListener('click',()=>{
  monthReport()
  if(weekchart)
  {
      weekchart.style.display = "none"
  }
  if(yearchart)
  {
      yearchart.style.display = 'none'
  }
  monthchart.style.display = "block"
})

yearbtn.addEventListener('click',()=>{
  yearReport()
  if(monthchart)
  {
      monthchart.style.display = "none"
  }
  if(weekchart)
  {
      weekchart.style.display = 'none'
  }
  yearchart.style.display = "block"
})

const ctx = document.getElementById('linechart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Earnings in Week',
      data: [120000, 190000, 30000, 500000],
      borderWidth: 1,
      backgroundColor:'#ff3f00',
      borderColor:'#ff3f00',
      color:'#ff3f00'
    }]
  },
  options: {
    responsive:true
  }
});


const ctx1 = document.getElementById('linechart1');

new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'],
    datasets: [{
      label: 'Earnings in Month',
      data: [120000, 190000, 30000, 500000, 20000, 30000,120000, 190000, 30000, 500000, 20000, 30000,],
      borderWidth: 1,
      backgroundColor:'#ff3f00',
      borderColor:'#ff3f00',
      color:'#ff3f00'
    }]
  },
  options: {
    responsive:true
  }
});

const ctx2 = document.getElementById('linechart2');

new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['2023','2024'],
    datasets: [{
      label: 'Earnings in Year',
      data: [120000, 190000],
      borderWidth: 1,
      backgroundColor:'#ff3f00',
      borderColor:'#ff3f00',
      color:'#ff3f00'
    }]
  },
  options: {
    responsive:true
  }
});




const ctx4 = document.getElementById('doughnutchart');

new Chart(ctx4, {
  type: 'doughnut',
  data: {
    labels: ['category1', 'Category2','Others'],
    datasets: [{
      label: 'Earnings',
      data: [120000, 30000,190000],
      borderWidth: 1,
      backgroundColor:['#ff3f00',
      '#1e96fc',
      '#fcf300',
      ],

    }]
  },
  options: {
    responsive:true
  }
});




