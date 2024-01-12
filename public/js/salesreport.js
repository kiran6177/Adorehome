const dailybtn = document.getElementById('dailybtn')
const weekbtn  = document.getElementById('weekbtn')
const monthbtn = document.getElementById('monthbtn')
const yearbtn = document.getElementById('yearbtn')
const weekbuttons = document.getElementById('weekbuttons')
const monthbuttons = document.getElementById('monthbuttons')
const yearbuttons = document.getElementById('yearbuttons')

const dailybtn1 = document.getElementById('dailybtn1')
const weekbtn1  = document.getElementById('weekbtn1')
const monthbtn1 = document.getElementById('monthbtn1')
const yearbtn1 = document.getElementById('yearbtn1')
const weekbuttons1 = document.getElementById('weekbuttons1')
const monthbuttons1 = document.getElementById('monthbuttons1')
const yearbuttons1 = document.getElementById('yearbuttons1')

dailybtn.addEventListener('click',()=>{
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
})


dailybtn1.addEventListener('click',()=>{
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
})