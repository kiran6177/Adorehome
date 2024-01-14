const weekbtn = document.getElementById('weekbtn')
const monthbtn = document.getElementById('monthbtn')
const yearbtn = document.getElementById('yearbtn')
const weekchart = document.getElementById('weekchart')
const monthchart = document.getElementById('monthchart')
const yearchart = document.getElementById('yearchart')

let weekValues = []
let monthNames = []
let monthValues = []
let yearHeads = []
let yearValues = []
let catHead = []
let catValues = []

async function weekReport()
{
    try {
        console.log("weekreport")
        const res = await fetch('/admin/home/weekreport')
        const data = await res.json()
        if(data.weekData)
        {
          weekValues =  data.weekData
          chart1()
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
        if(data.monthdata)
        {
          console.log(data.monthdata)
          for(let i = 0;i< data.monthdata.length;i++)
          {
            monthNames.push(data.monthdata[i].month)
            monthValues.push(data.monthdata[i].amount)
          }
          chart2()
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
        if(data.yeardata)
        {
          for(let i = 0;i < data.yeardata.length ; i++)
          {
            yearHeads.push(data.yeardata[i].year)
            yearValues.push(data.yeardata[i].amount)
          }
          chart3()
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

async function categoryReport()
{
  try {
    const res = await fetch('/admin/home/categoryreport')
    const data = await res.json()
    if(data.catData)
    {
      for(let i = 0;i < data.catData.length ; i++)
      {
        catHead.push(data.catData[i]._id)
        catValues.push(data.catData[i].amount)
      }
      doughnut()
    }
    else{
      Swal.fire({
        title:"Category Data not available",
        imageUrl: "/public/images/paymentfailed.png",
        imageWidth: 200,
        imageHeight: 200,
    })
    }
  } catch (error) {
    console.log(error.message)
  }
}

window.onload = async function()
{
  weekReport()
  categoryReport()
}

weekbtn.addEventListener('click',()=>{
  weekReport()
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

function chart1()
{
  const ctx = document.getElementById('linechart');

let Chart1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Earnings in Week',
      data: weekValues,
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
}

function chart2(){
  const ctx1 = document.getElementById('linechart1');

let Chart2 = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: monthNames.reverse(),
    datasets: [{
      label: 'Earnings in Month',
      data: monthValues.reverse(),
      borderWidth: 1,
      backgroundColor:'#ff3f00',
      borderColor:'#ff3f00',
      color:'#ff3f00'
    }]
  },
  options: {
    responsive:true
  }
});}

function chart3(){
  const ctx2 = document.getElementById('linechart2');

let Chart3 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: yearHeads,
    datasets: [{
      label: 'Earnings in Year',
      data: yearValues,
      borderWidth: 1,
      backgroundColor:'#ff3f00',
      borderColor:'#ff3f00',
      color:'#ff3f00'
    }]
  },
  options: {
    responsive:true
  }
});}




function doughnut(){
  const ctx4 = document.getElementById('doughnutchart');

const Chart4 = new Chart(ctx4, {
  type: 'doughnut',
  data: {
    labels: catHead,
    datasets: [{
      label: 'Earnings',
      data: catValues,
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
});}




