const dailybtn = document.getElementById("dailybtn");
const weekbtn = document.getElementById("weekbtn");
const monthbtn = document.getElementById("monthbtn");
const yearbtn = document.getElementById("yearbtn");
const dailybuttons = document.getElementById("dailybuttons");
const weekbuttons = document.getElementById("weekbuttons");
const monthbuttons = document.getElementById("monthbuttons");
const yearbuttons = document.getElementById("yearbuttons");
const page = document.getElementById('page')
const dpage = document.getElementById('dpage')
const wpage = document.getElementById('wpage')
const mpage = document.getElementById('mpage')
const ypage = document.getElementById('ypage')
const pgmain = document.getElementById('pgmain')
const dpgmain = document.getElementById('dpgmain')
const wpgmain = document.getElementById('wpgmain')
const mpgmain = document.getElementById('mpgmain')
const ypgmain = document.getElementById('ypgmain')

const dailybtn1 = document.getElementById("dailybtn1");
const weekbtn1 = document.getElementById("weekbtn1");
const monthbtn1 = document.getElementById("monthbtn1");
const yearbtn1 = document.getElementById("yearbtn1");
const dailybuttons1 = document.getElementById("dailybuttons1");
const weekbuttons1 = document.getElementById("weekbuttons1");
const monthbuttons1 = document.getElementById("monthbuttons1");
const yearbuttons1 = document.getElementById("yearbuttons1");

const Dday = document.getElementById("Dday");
const Dmonth = document.getElementById("Dmonth");
const Dyear = document.getElementById("Dyear");
const Wweek = document.getElementById("Wweek");
const Wmonth = document.getElementById("Wmonth");
const Wyear = document.getElementById("Wyear");
const Mmonth = document.getElementById("Mmonth");
const Myear = document.getElementById("Myear");
const Yyear = document.getElementById("Yyear");
const promaintable = document.querySelector("#promaintable tbody");
const promaintable1 = document.querySelector("#promaintable1 ");

const protable = document.querySelectorAll(".protable");
let totaldailypgcount

async function fetchByDate(day, month, year) {
  try {
    console.log(day)
    const res = await fetch(
      `/admin/salesreport/dailypro?day=${day}&month=${month}&year=${year}`
    );
    const data = await res.json();
    if (data.proSold.length > 0) {
      const newdata = document.querySelectorAll(".newdata");
      if (newdata) {
        newdata.forEach((el) => el.remove());
      }
      protable.forEach((el) => el.remove());

      for (let i = 0; i < data.proSold.length; i++) {
        console.log(data.proSold);
        const date = new Date(data.proSold[i].date);
        date.setUTCHours(0,0,0,0)
        console.log(date.getDate())
        const monthno = date.getMonth();
        function getMonthName(data) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[data];
        }
        let month = getMonthName(monthno);

        const newrow = document.createElement("tr");
        newrow.classList.add("newdata");
        newrow.innerHTML = `<td>${i + 1}</td>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
          data.proSold[i].userdetails[0].lastname
        }</td>
            <td>${data.proSold[i].prodetails[0].productname}</td>
            <td>${data.proSold[i].products.qty}Pcs</td>
            <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            <td>Rs.${data.proSold[i].total_amount}</td>
            <td>${data.proSold[i].payment_method}</td>`;

        promaintable.appendChild(newrow);
      }

      promaintable1.innerHTML = "";
      const newrow1 = document.createElement("tbody");
        newrow1.classList.add("newdata");
      for (let i = 0; i < data.proSold.length; i++) {
        console.log(data.proSold);
        const date = new Date(data.proSold[i].date);
        date.setUTCHours(0,0,0,0)
        const monthno = date.getMonth();
        function getMonthName(data) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[data];
        }
        let month = getMonthName(monthno);

        
        newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
            <tr><th>Date Purchased</th>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            </tr>
            <tr>
                <th>Customer Name</th>
                <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
            </tr>
            <tr>
                <th>Product Name </th>
                <td>${data.proSold[i].prodetails[0].productname }</td>
            </tr>
            <tr>
                <th>Quantity</th>
                <td>${data.proSold[i].products.qty}Pcs</td>
            </tr>
            <tr>
                <th>Price</th>
                <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            </tr>
            <tr>
                <th>Order Amount</th>
                <td>Rs.${data.proSold[i].total_amount}</td>

            </tr>
            <tr>
                <th>Payment Method</th>
                <td>${data.proSold[i].payment_method}</td>
            </tr>
           <tr><td></td><td></td></tr>`;


      }
      promaintable1.appendChild(newrow1);
      console.log(data.procount)
      totaldailypgcount = Math.ceil(data.procount / 8)
      console.log(totaldailypgcount)
      proDailyPageLoop(totaldailypgcount,1)


    } else {
      const newdata = document.querySelectorAll(".newdata");
      if (newdata) {
        newdata.forEach((el) => el.remove());
      }
      protable.forEach((el) => el.remove());

      const newrow = document.createElement("tr");
      newrow.classList.add("newdata");
      newrow.innerHTML =
        "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
      promaintable.appendChild(newrow);

      promaintable1.innerHTML = "";
      const newrow1 = document.createElement("tbody");
        newrow1.classList.add("newdata");
        newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
        promaintable1.appendChild(newrow1)
    }
  } catch (err) {
    window.location.href = "/login";
  }
}

Dday.addEventListener("change", () => {
  dpage.style.display = 'block'
  if(page)
  {
    page.style.display = 'none'
  }
  let day = Dday.value;
  let month = Dmonth.value;
  let year = Dyear.value;
  console.log(Dday.value);
  console.log(Dmonth.value);
  console.log(Dyear.value);
  fetchByDate(day, month, year);
});
Dmonth.addEventListener("change", () => {
  dpage.style.display = 'block'
  if(page)
  {
    page.style.display = 'none'
  }
  let day = Dday.value;
  let month = Dmonth.value;
  let year = Dyear.value;
  console.log(Dday.value);
  console.log(Dmonth.value);
  console.log(Dyear.value);
  fetchByDate(day, month, year);
});
Dyear.addEventListener("change", () => {
  dpage.style.display = 'block'
  if(page)
  {
    page.style.display = 'none'
  }
  let day = Dday.value;
  let month = Dmonth.value;
  let year = Dyear.value;
  console.log(Dday.value);
  console.log(Dmonth.value);
  console.log(Dyear.value);
  fetchByDate(day, month, year);
});

dailybtn.addEventListener("click", () => {
  dailybuttons.style.display = "block";
  dpage.style.display = 'block'
  fetchByDate(1,0,2024)
  proDailyPageLoop(totaldailypgcount,1)
  if (weekbuttons) {
    weekbuttons.style.display = "none";
  }
  if (monthbuttons) {
    monthbuttons.style.display = "none";
  }
  if (yearbuttons) {
    yearbuttons.style.display = "none";
  }
  if(wpage)
  {
    wpage.style.display = 'none'
  }
  if(mpage)
  {
    mpage.style.display = 'none'
  }
  if(ypage)
  {
    ypage.style.display = 'none'
  }
  if(page)
  {
    page.style.display = 'none'
  }
});


const totPro = document.getElementById('procount')
const totalpgcount = Math.ceil(totPro.value / 8)


async function nextPage(page)
{
  try{
    const res = await fetch(
    `/admin/salesreport/dailypro?page=${page}`
  );
  const data = await res.json();
  if (data.proSold.length > 0) {
    const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      console.log(date.getDate())
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      const newrow = document.createElement("tr");
      newrow.classList.add("newdata");
      newrow.innerHTML = `<td>${i + 1}</td>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
        data.proSold[i].userdetails[0].lastname
      }</td>
          <td>${data.proSold[i].prodetails[0].productname}</td>
          <td>${data.proSold[i].products.qty}Pcs</td>
          <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          <td>Rs.${data.proSold[i].total_amount}</td>
          <td>${data.proSold[i].payment_method}</td>`;

      promaintable.appendChild(newrow);
    }

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      
      newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
          <tr><th>Date Purchased</th>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          </tr>
          <tr>
              <th>Customer Name</th>
              <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
          </tr>
          <tr>
              <th>Product Name </th>
              <td>${data.proSold[i].prodetails[0].productname }</td>
          </tr>
          <tr>
              <th>Quantity</th>
              <td>${data.proSold[i].products.qty}Pcs</td>
          </tr>
          <tr>
              <th>Price</th>
              <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          </tr>
          <tr>
              <th>Order Amount</th>
              <td>Rs.${data.proSold[i].total_amount}</td>

          </tr>
          <tr>
              <th>Payment Method</th>
              <td>${data.proSold[i].payment_method}</td>
          </tr>
         <tr><td></td><td></td></tr>`;


    }
    promaintable1.appendChild(newrow1);

    proPageLoop(totalpgcount,page)
  } else {
    const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    const newrow = document.createElement("tr");
    newrow.classList.add("newdata");
    newrow.innerHTML =
      "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
    promaintable.appendChild(newrow);

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
      newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
      promaintable1.appendChild(newrow1)
  }
} catch (err) {
  window.location.href = "/login";
}
}


function proPageLoop(totalpgcount, currentPage) {
  let beforepage = currentPage - 1;
  let afterpage = currentPage + 1;

  let active;

  if (currentPage === totalpgcount && totalpgcount != 1) {
    pgmain.innerHTML = "";
    pgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    if (totalpgcount < 4) {
      for (let i = beforepage; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextPage(${i})">${i}</button>`;
      }
    } else {
      for (let i = beforepage - 2; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextPage(${i})">${i}</button>`;
      }
    }

    if (currentPage != totalpgcount) {
      pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    }
  } else if (currentPage === 1) {
    pgmain.innerHTML = "";

    if (totalpgcount > 2) {
      for (let i = beforepage; i <= afterpage + 2; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        if (i == 0) {
          continue;
        }
        pgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextPage(${i})">${i}</button>`;
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
        pgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextPage(${i})">${i}</button>`;
      }
    }
    if (currentPage != totalpgcount) {
      pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      pgmain.innerHTML += "";
    }
  } else if (currentPage > 1) {
    pgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = beforepage; i <= afterpage; i++) {
      if (currentPage === i) {
        active = "selectedbtn";
      } else {
        active = "";
      }
      pgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextPage(${i})">${i}</button>`;
    }
    if (currentPage != totalpgcount) {
      pgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      pgmain.innerHTML += "";
    }
  }

  console.log(currentPage);
}

proPageLoop(totalpgcount, 1);




async function nextDailyPage(page)
{
  try{
    console.log(page)
    let day = Dday.value
    let month = Dmonth.value
    let year = Dyear.value
    console.log(day,month,year)
    const res = await fetch(
    `/admin/salesreport/dailypro?day=${day}&month=${month}&year=${year}&page=${page}`
  );
  const data = await res.json();
  if (data.proSold.length > 0) {
    const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      console.log(date.getDate())
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      const newrow = document.createElement("tr");
      newrow.classList.add("newdata");
      newrow.innerHTML = `<td>${i + 1}</td>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
        data.proSold[i].userdetails[0].lastname
      }</td>
          <td>${data.proSold[i].prodetails[0].productname}</td>
          <td>${data.proSold[i].products.qty}Pcs</td>
          <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          <td>Rs.${data.proSold[i].total_amount}</td>
          <td>${data.proSold[i].payment_method}</td>`;

      promaintable.appendChild(newrow);
    }

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      
      newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
          <tr><th>Date Purchased</th>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          </tr>
          <tr>
              <th>Customer Name</th>
              <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
          </tr>
          <tr>
              <th>Product Name </th>
              <td>${data.proSold[i].prodetails[0].productname }</td>
          </tr>
          <tr>
              <th>Quantity</th>
              <td>${data.proSold[i].products.qty}Pcs</td>
          </tr>
          <tr>
              <th>Price</th>
              <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          </tr>
          <tr>
              <th>Order Amount</th>
              <td>Rs.${data.proSold[i].total_amount}</td>

          </tr>
          <tr>
              <th>Payment Method</th>
              <td>${data.proSold[i].payment_method}</td>
          </tr>
         <tr><td></td><td></td></tr>`;


    }
    promaintable1.appendChild(newrow1);

    proDailyPageLoop(totaldailypgcount,page)
  } else {
    const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    const newrow = document.createElement("tr");
    newrow.classList.add("newdata");
    newrow.innerHTML =
      "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
    promaintable.appendChild(newrow);

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
      newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
      promaintable1.appendChild(newrow1)
  }
} catch (err) {
  window.location.href = "/admin/login";
}
}


function proDailyPageLoop(totaldailypgcount, currentPage) {
  let beforepage = currentPage - 1;
  let afterpage = currentPage + 1;
  console.log("tot"+totaldailypgcount)
  let active;

  if (currentPage === totaldailypgcount && totaldailypgcount != 1) {
    dpgmain.innerHTML = "";
    dpgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextDailyPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    if (totaldailypgcount < 4) {
      for (let i = beforepage; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        dpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextDailyPage(${i})">${i}</button>`;
      }
    } else {
      for (let i = beforepage - 2; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        dpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextDailyPage(${i})">${i}</button>`;
      }
    }

    if (currentPage != totaldailypgcount) {
      dpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextDailyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    }
  } else if (currentPage === 1) {
    dpgmain.innerHTML = "";

    if (totaldailypgcount > 2) {
      for (let i = beforepage; i <= afterpage + 2; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        if (i == 0) {
          continue;
        }
        dpgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextDailyPage(${i})">${i}</button>`;
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
        dpgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextDailyPage(${i})">${i}</button>`;
      }
    }
    if (currentPage != totaldailypgcount) {
      dpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextDailyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      dpgmain.innerHTML += "";
    }
  } else if (currentPage > 1) {
    dpgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextDailyPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = beforepage; i <= afterpage; i++) {
      if (currentPage === i) {
        active = "selectedbtn";
      } else {
        active = "";
      }
      dpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextDailyPage(${i})">${i}</button>`;
    }
    if (currentPage != totaldailypgcount) {
      dpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextDailyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      dpgmain.innerHTML += "";
    }
  }

  console.log(currentPage);
}





let totalweeklypgcount

async function fetchByWeek(week,month,year)
{
  try {
    const res = await fetch(`/admin/salesreport/weeklypro?week=${week}&month=${month}&year=${year}`)
    const data = await res.json()
    if(data.proSold && data.proSold.length > 0)
    {
      console.log(data.proSold)

      const newdata = document.querySelectorAll(".newdata");
      if (newdata) {
        newdata.forEach((el) => el.remove());
      }
      protable.forEach((el) => el.remove());
  
      for (let i = 0; i < data.proSold.length; i++) {
        console.log(data.proSold);
        const date = new Date(data.proSold[i].date);
        date.setUTCHours(0,0,0,0)
        console.log(date.getDate())
        const monthno = date.getMonth();
        function getMonthName(data) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[data];
        }
        let month = getMonthName(monthno);
  
        const newrow = document.createElement("tr");
        newrow.classList.add("newdata");
        newrow.innerHTML = `<td>${i + 1}</td>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
          data.proSold[i].userdetails[0].lastname
        }</td>
            <td>${data.proSold[i].prodetails[0].productname}</td>
            <td>${data.proSold[i].products.qty}Pcs</td>
            <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            <td>Rs.${data.proSold[i].total_amount}</td>
            <td>${data.proSold[i].payment_method}</td>`;
  
        promaintable.appendChild(newrow);
      }
  
      promaintable1.innerHTML = "";
      const newrow1 = document.createElement("tbody");
        newrow1.classList.add("newdata");
      for (let i = 0; i < data.proSold.length; i++) {
        console.log(data.proSold);
        const date = new Date(data.proSold[i].date);
        date.setUTCHours(0,0,0,0)
        const monthno = date.getMonth();
        function getMonthName(data) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[data];
        }
        let month = getMonthName(monthno);
  
        
        newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
            <tr><th>Date Purchased</th>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            </tr>
            <tr>
                <th>Customer Name</th>
                <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
            </tr>
            <tr>
                <th>Product Name </th>
                <td>${data.proSold[i].prodetails[0].productname }</td>
            </tr>
            <tr>
                <th>Quantity</th>
                <td>${data.proSold[i].products.qty}Pcs</td>
            </tr>
            <tr>
                <th>Price</th>
                <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            </tr>
            <tr>
                <th>Order Amount</th>
                <td>Rs.${data.proSold[i].total_amount}</td>
  
            </tr>
            <tr>
                <th>Payment Method</th>
                <td>${data.proSold[i].payment_method}</td>
            </tr>
           <tr><td></td><td></td></tr>`;
  
  
      }
      promaintable1.appendChild(newrow1);
  

      totalweeklypgcount = Math.ceil(data.procount / 8)
      proWeeklyPageLoop(totalweeklypgcount,1)
    }     
    else{

      console.log(data.proerr)
      const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    const newrow = document.createElement("tr");
    newrow.classList.add("newdata");
    newrow.innerHTML =
      "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
    promaintable.appendChild(newrow);

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
      newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
      promaintable1.appendChild(newrow1)
    proWeeklyPageLoop(1,1)
    } 

  } catch (error) {
    window.location.href = '/admin/login'
    console.log(error.message)
  }
}



Wweek.addEventListener("change", () => {
  let week = Wweek.value;
  let month = Wmonth.value;
  let year = Wyear.value;
  console.log(Wweek.value);
  console.log(Wmonth.value);
  console.log(Wyear.value);
  fetchByWeek(week, month, year);
});
Wmonth.addEventListener("change", () => {
  let week = Wweek.value;
  let month = Wmonth.value;
  let year = Wyear.value;
  console.log(Wweek.value);
  console.log(Wmonth.value);
  console.log(Wyear.value);
  fetchByWeek(week, month, year);
});
Wyear.addEventListener("change", () => {
  let week = Wweek.value;
  let month = Wmonth.value;
  let year = Wyear.value;
  console.log(Wweek.value);
  console.log(Wmonth.value);
  console.log(Wyear.value);
  fetchByWeek(week, month, year);
});


async function nextWeeklyPage(page)
{
  try {
    console.log(page)
    let week = Wweek.value
    let month = Wmonth.value
    let year = Wyear.value
    console.log(week,month,year)
    const res = await fetch(
    `/admin/salesreport/weeklypro?week=${week}&month=${month}&year=${year}&page=${page}`
  );
  const data = await res.json();
  if (data.proSold && data.proSold.length > 0) {
    const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      console.log(date.getDate())
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      const newrow = document.createElement("tr");
      newrow.classList.add("newdata");
      newrow.innerHTML = `<td>${i + 1}</td>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
        data.proSold[i].userdetails[0].lastname
      }</td>
          <td>${data.proSold[i].prodetails[0].productname}</td>
          <td>${data.proSold[i].products.qty}Pcs</td>
          <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          <td>Rs.${data.proSold[i].total_amount}</td>
          <td>${data.proSold[i].payment_method}</td>`;

      promaintable.appendChild(newrow);
    }

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      
      newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
          <tr><th>Date Purchased</th>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          </tr>
          <tr>
              <th>Customer Name</th>
              <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
          </tr>
          <tr>
              <th>Product Name </th>
              <td>${data.proSold[i].prodetails[0].productname }</td>
          </tr>
          <tr>
              <th>Quantity</th>
              <td>${data.proSold[i].products.qty}Pcs</td>
          </tr>
          <tr>
              <th>Price</th>
              <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          </tr>
          <tr>
              <th>Order Amount</th>
              <td>Rs.${data.proSold[i].total_amount}</td>

          </tr>
          <tr>
              <th>Payment Method</th>
              <td>${data.proSold[i].payment_method}</td>
          </tr>
         <tr><td></td><td></td></tr>`;


    }
    promaintable1.appendChild(newrow1);

    proWeeklyPageLoop(totalweeklypgcount,page)
  } else {
    const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    const newrow = document.createElement("tr");
    newrow.classList.add("newdata");
    newrow.innerHTML =
      "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
    promaintable.appendChild(newrow);

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
      newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
      promaintable1.appendChild(newrow1)

      proWeeklyPageLoop(1,1)
  }
  } catch (error) {
    console.log(error.message)
  }
}

weekbtn.addEventListener("click", () => {
  console.log("hello")
  weekbuttons.style.display = "block";
  wpage.style.display = 'block'
  fetchByWeek(1,1,2024)
  if (monthbuttons) {
    monthbuttons.style.display = "none";
  }
  if (yearbuttons) {
    yearbuttons.style.display = "none";
  }
  if (dailybuttons) {
    dailybuttons.style.display = "none";
  }
  if(dpage)
  {
    dpage.style.display = 'none'
  }
  if(mpage)
  {
    mpage.style.display = 'none'
  }
  if(ypage)
  {
    ypage.style.display = 'none'
  }
  if(page)
  {
    page.style.display = 'none'
  }
});


function proWeeklyPageLoop(totalweeklypgcount, currentPage) {
  let beforepage = currentPage - 1;
  let afterpage = currentPage + 1;
  console.log("totW"+totalweeklypgcount)
  let active;

  if (currentPage === totalweeklypgcount && totalweeklypgcount != 1) {
    wpgmain.innerHTML = "";
    wpgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextWeeklyPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    if (totalweeklypgcount < 4) {
      for (let i = beforepage; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        wpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextWeeklyPage(${i})">${i}</button>`;
      }
    } else {
      for (let i = beforepage - 2; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        wpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextWeeklyPage(${i})">${i}</button>`;
      }
    }

    if (currentPage != totalweeklypgcount) {
      wpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextWeeklyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    }
  } else if (currentPage === 1) {
    wpgmain.innerHTML = "";

    if (totalweeklypgcount > 2) {
      for (let i = beforepage; i <= afterpage + 2; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        if (i == 0) {
          continue;
        }
        wpgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextWeeklyPage(${i})">${i}</button>`;
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
        wpgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextWeeklyPage(${i})">${i}</button>`;
      }
    }
    if (currentPage != totalweeklypgcount) {
      wpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextWeeklyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      wpgmain.innerHTML += "";
    }
  } else if (currentPage > 1) {
    wpgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextWeeklyPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = beforepage; i <= afterpage; i++) {
      if (currentPage === i) {
        active = "selectedbtn";
      } else {
        active = "";
      }
      wpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextWeeklyPage(${i})">${i}</button>`;
    }
    if (currentPage != totalweeklypgcount) {
      wpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextWeeklyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      wpgmain.innerHTML += "";
    }
  }

  console.log(currentPage);
}


let totalmonthlypgcount

async function fetchByMonth(month,year)
{
  try {
    const res = await fetch(`/admin/salesreport/monthlypro?month=${month}&year=${year}`)
    const data = await res.json()
    if(data.proSold && data.proSold.length > 0){
      console.log(data.proSold)
      console.log(data.procount)
      const newdata = document.querySelectorAll(".newdata");
      if (newdata) {
        newdata.forEach((el) => el.remove());
      }
      protable.forEach((el) => el.remove());
  
      for (let i = 0; i < data.proSold.length; i++) {
        console.log(data.proSold);
        const date = new Date(data.proSold[i].date);
        date.setUTCHours(0,0,0,0)
        console.log(date.getDate())
        const monthno = date.getMonth();
        function getMonthName(data) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[data];
        }
        let month = getMonthName(monthno);
  
        const newrow = document.createElement("tr");
        newrow.classList.add("newdata");
        newrow.innerHTML = `<td>${i + 1}</td>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
          data.proSold[i].userdetails[0].lastname
        }</td>
            <td>${data.proSold[i].prodetails[0].productname}</td>
            <td>${data.proSold[i].products.qty}Pcs</td>
            <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            <td>Rs.${data.proSold[i].total_amount}</td>
            <td>${data.proSold[i].payment_method}</td>`;
  
        promaintable.appendChild(newrow);
      }
  
      promaintable1.innerHTML = "";
      const newrow1 = document.createElement("tbody");
        newrow1.classList.add("newdata");
      for (let i = 0; i < data.proSold.length; i++) {
        console.log(data.proSold);
        const date = new Date(data.proSold[i].date);
        date.setUTCHours(0,0,0,0)
        const monthno = date.getMonth();
        function getMonthName(data) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[data];
        }
        let month = getMonthName(monthno);
  
        
        newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
            <tr><th>Date Purchased</th>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            </tr>
            <tr>
                <th>Customer Name</th>
                <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
            </tr>
            <tr>
                <th>Product Name </th>
                <td>${data.proSold[i].prodetails[0].productname }</td>
            </tr>
            <tr>
                <th>Quantity</th>
                <td>${data.proSold[i].products.qty}Pcs</td>
            </tr>
            <tr>
                <th>Price</th>
                <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            </tr>
            <tr>
                <th>Order Amount</th>
                <td>Rs.${data.proSold[i].total_amount}</td>
  
            </tr>
            <tr>
                <th>Payment Method</th>
                <td>${data.proSold[i].payment_method}</td>
            </tr>
           <tr><td></td><td></td></tr>`;
  
  
      }
      promaintable1.appendChild(newrow1);
  

      totalmonthlypgcount = Math.ceil(data.procount / 8)
      proMonthlyPageLoop(totalmonthlypgcount,1)

    }
    else{
      console.log(data.proerr)
      const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    const newrow = document.createElement("tr");
    newrow.classList.add("newdata");
    newrow.innerHTML =
      "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
    promaintable.appendChild(newrow);

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
      newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
      promaintable1.appendChild(newrow1)
      proMonthlyPageLoop(1,1)
    }
  } catch (error) {
    window.location.href = '/admin/login'
    console.log(error.message)
  }
}

async function nextMonthlyPage(page)
{
  try{
  let month = Mmonth.value;
  let year = Myear.value;
  const res = await fetch(`/admin/salesreport/monthlypro?month=${month}&year=${year}&page=${page}`)
  const data = await res.json()
  if(data.proSold && data.proSold.length > 0){
    console.log(data.proSold)
    console.log(data.procount)
    const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      console.log(date.getDate())
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      const newrow = document.createElement("tr");
      newrow.classList.add("newdata");
      newrow.innerHTML = `<td>${i + 1}</td>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
        data.proSold[i].userdetails[0].lastname
      }</td>
          <td>${data.proSold[i].prodetails[0].productname}</td>
          <td>${data.proSold[i].products.qty}Pcs</td>
          <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          <td>Rs.${data.proSold[i].total_amount}</td>
          <td>${data.proSold[i].payment_method}</td>`;

      promaintable.appendChild(newrow);
    }

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      
      newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
          <tr><th>Date Purchased</th>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          </tr>
          <tr>
              <th>Customer Name</th>
              <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
          </tr>
          <tr>
              <th>Product Name </th>
              <td>${data.proSold[i].prodetails[0].productname }</td>
          </tr>
          <tr>
              <th>Quantity</th>
              <td>${data.proSold[i].products.qty}Pcs</td>
          </tr>
          <tr>
              <th>Price</th>
              <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          </tr>
          <tr>
              <th>Order Amount</th>
              <td>Rs.${data.proSold[i].total_amount}</td>

          </tr>
          <tr>
              <th>Payment Method</th>
              <td>${data.proSold[i].payment_method}</td>
          </tr>
         <tr><td></td><td></td></tr>`;


    }
    promaintable1.appendChild(newrow1);


    proMonthlyPageLoop(totalmonthlypgcount,page)

  }
  else{
    console.log(data.proerr)
    const newdata = document.querySelectorAll(".newdata");
  if (newdata) {
    newdata.forEach((el) => el.remove());
  }
  protable.forEach((el) => el.remove());

  const newrow = document.createElement("tr");
  newrow.classList.add("newdata");
  newrow.innerHTML =
    "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
  promaintable.appendChild(newrow);

  promaintable1.innerHTML = "";
  const newrow1 = document.createElement("tbody");
    newrow1.classList.add("newdata");
    newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
    promaintable1.appendChild(newrow1)
    proMonthlyPageLoop(1,1)
  }
  }
  catch(err)
  {
    window.location.href = '/admin/login'
    console.log(err.message)
  }
}

Mmonth.addEventListener("change", () => {
  let month = Mmonth.value;
  let year = Myear.value;
  console.log(Mmonth.value);
  console.log(Myear.value);
  fetchByMonth(month, year);
});
Myear.addEventListener("change", () => {
  let month = Mmonth.value;
  let year = Myear.value;
  console.log(Mmonth.value);
  console.log(Myear.value);
  fetchByMonth(month, year);
});

monthbtn.addEventListener("click", () => {
  monthbuttons.style.display = "block";
  mpage.style.display = 'block'
  fetchByMonth(1,2024)
  if (weekbuttons) {
    weekbuttons.style.display = "none";
  }
  if (yearbuttons) {
    yearbuttons.style.display = "none";
  }
  if (dailybuttons) {
    dailybuttons.style.display = "none";
  }
  if(wpage)
  {
    wpage.style.display = 'none'
  }
  if(dpage)
  {
    dpage.style.display = 'none'
  }
  if(ypage)
  {
    ypage.style.display = 'none'
  }
  if(page)
  {
    page.style.display = 'none'
  }
});

function proMonthlyPageLoop(totalmonthlypgcount, currentPage) {
  let beforepage = currentPage - 1;
  let afterpage = currentPage + 1;
  console.log("totW"+totalmonthlypgcount)
  let active;

  if (currentPage === totalmonthlypgcount && totalmonthlypgcount != 1) {
    mpgmain.innerHTML = "";
    mpgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextMonthlyPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    if (totalmonthlypgcount < 4) {
      for (let i = beforepage; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        mpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextMonthlyPage(${i})">${i}</button>`;
      }
    } else {
      for (let i = beforepage - 2; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        mpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextMonthlyPage(${i})">${i}</button>`;
      }
    }

    if (currentPage != totalmonthlypgcount) {
      mpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextMonthlyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    }
  } else if (currentPage === 1) {
    mpgmain.innerHTML = "";

    if (totalmonthlypgcount > 2) {
      for (let i = beforepage; i <= afterpage + 2; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        if (i == 0) {
          continue;
        }
        mpgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextMonthlyPage(${i})">${i}</button>`;
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
        mpgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextMonthlyPage(${i})">${i}</button>`;
      }
    }
    if (currentPage != totalmonthlypgcount) {
      mpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextMonthlyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      mpgmain.innerHTML += "";
    }
  } else if (currentPage > 1) {
    mpgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextMonthlyPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = beforepage; i <= afterpage; i++) {
      if (currentPage === i) {
        active = "selectedbtn";
      } else {
        active = "";
      }
      mpgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextMonthlyPage(${i})">${i}</button>`;
    }
    if (currentPage != totalmonthlypgcount) {
      mpgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextMonthlyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      mpgmain.innerHTML += "";
    }
  }

  console.log(currentPage);
}


let totalyearlypgcount

async function fetchByYear(year)
{
  try {
    const res = await fetch(`/admin/salesreport/yearlypro?year=${year}`)
    const data = await res.json()
    if(data.proSold && data.proSold.length > 0)
    {
      console.log(data.proSold)
      console.log(data.procount)
      const newdata = document.querySelectorAll(".newdata");
      if (newdata) {
        newdata.forEach((el) => el.remove());
      }
      protable.forEach((el) => el.remove());
  
      for (let i = 0; i < data.proSold.length; i++) {
        console.log(data.proSold);
        const date = new Date(data.proSold[i].date);
        date.setUTCHours(0,0,0,0)
        console.log(date.getDate())
        const monthno = date.getMonth();
        function getMonthName(data) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[data];
        }
        let month = getMonthName(monthno);
  
        const newrow = document.createElement("tr");
        newrow.classList.add("newdata");
        newrow.innerHTML = `<td>${i + 1}</td>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
          data.proSold[i].userdetails[0].lastname
        }</td>
            <td>${data.proSold[i].prodetails[0].productname}</td>
            <td>${data.proSold[i].products.qty}Pcs</td>
            <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            <td>Rs.${data.proSold[i].total_amount}</td>
            <td>${data.proSold[i].payment_method}</td>`;
  
        promaintable.appendChild(newrow);
      }
  
      promaintable1.innerHTML = "";
      const newrow1 = document.createElement("tbody");
        newrow1.classList.add("newdata");
      for (let i = 0; i < data.proSold.length; i++) {
        console.log(data.proSold);
        const date = new Date(data.proSold[i].date);
        date.setUTCHours(0,0,0,0)
        const monthno = date.getMonth();
        function getMonthName(data) {
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[data];
        }
        let month = getMonthName(monthno);
  
        
        newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
            <tr><th>Date Purchased</th>
            <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
            </tr>
            <tr>
                <th>Customer Name</th>
                <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
            </tr>
            <tr>
                <th>Product Name </th>
                <td>${data.proSold[i].prodetails[0].productname }</td>
            </tr>
            <tr>
                <th>Quantity</th>
                <td>${data.proSold[i].products.qty}Pcs</td>
            </tr>
            <tr>
                <th>Price</th>
                <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
            </tr>
            <tr>
                <th>Order Amount</th>
                <td>Rs.${data.proSold[i].total_amount}</td>
  
            </tr>
            <tr>
                <th>Payment Method</th>
                <td>${data.proSold[i].payment_method}</td>
            </tr>
           <tr><td></td><td></td></tr>`;
  
  
      }
      promaintable1.appendChild(newrow1);

      totalyearlypgcount = Math.ceil(data.procount/8)
      proYearlyPageLoop(totalyearlypgcount,1)
    }
    else{
      console.log(data.proerr)
      const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    const newrow = document.createElement("tr");
    newrow.classList.add("newdata");
    newrow.innerHTML =
      "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
    promaintable.appendChild(newrow);

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
      newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
      promaintable1.appendChild(newrow1)

    proYearlyPageLoop(1,1)
    }
  } catch (error) {
    window.location.href = '/admin/login'
    console.log(error.message)
  }
}

async function nextYearlyPage(page)
{
  try {
    const year = Yyear.value
    const res = await fetch(`/admin/salesreport/yearlypro?year=${year}&page=${page}`)
    const data = await res.json()
    if(data.proSold && data.proSold.length > 0){
      const newdata = document.querySelectorAll(".newdata");
    if (newdata) {
      newdata.forEach((el) => el.remove());
    }
    protable.forEach((el) => el.remove());

    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      console.log(date.getDate())
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      const newrow = document.createElement("tr");
      newrow.classList.add("newdata");
      newrow.innerHTML = `<td>${i + 1}</td>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${
        data.proSold[i].userdetails[0].lastname
      }</td>
          <td>${data.proSold[i].prodetails[0].productname}</td>
          <td>${data.proSold[i].products.qty}Pcs</td>
          <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          <td>Rs.${data.proSold[i].total_amount}</td>
          <td>${data.proSold[i].payment_method}</td>`;

      promaintable.appendChild(newrow);
    }

    promaintable1.innerHTML = "";
    const newrow1 = document.createElement("tbody");
      newrow1.classList.add("newdata");
    for (let i = 0; i < data.proSold.length; i++) {
      console.log(data.proSold);
      const date = new Date(data.proSold[i].date);
      date.setUTCHours(0,0,0,0)
      const monthno = date.getMonth();
      function getMonthName(data) {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthNames[data];
      }
      let month = getMonthName(monthno);

      
      newrow1.innerHTML += `<tr><th>Serial No.</th><td>${i+1}</td> </tr>
          <tr><th>Date Purchased</th>
          <td> ${date.getDate()}&nbsp; ${month} &nbsp;${date.getFullYear()}&nbsp;</td>
          </tr>
          <tr>
              <th>Customer Name</th>
              <td>${data.proSold[i].userdetails[0].firstname}&nbsp; ${data.proSold[i].userdetails[0].lastname}</td>
          </tr>
          <tr>
              <th>Product Name </th>
              <td>${data.proSold[i].prodetails[0].productname }</td>
          </tr>
          <tr>
              <th>Quantity</th>
              <td>${data.proSold[i].products.qty}Pcs</td>
          </tr>
          <tr>
              <th>Price</th>
              <td>Rs. ${data.proSold[i].prodetails[0].price}</td>
          </tr>
          <tr>
              <th>Order Amount</th>
              <td>Rs.${data.proSold[i].total_amount}</td>

          </tr>
          <tr>
              <th>Payment Method</th>
              <td>${data.proSold[i].payment_method}</td>
          </tr>
         <tr><td></td><td></td></tr>`;


    }
    promaintable1.appendChild(newrow1);

    proYearlyPageLoop(totalyearlypgcount,page)

    }else{
      console.log(data.proerr)
    const newdata = document.querySelectorAll(".newdata");
  if (newdata) {
    newdata.forEach((el) => el.remove());
  }
  protable.forEach((el) => el.remove());

  const newrow = document.createElement("tr");
  newrow.classList.add("newdata");
  newrow.innerHTML =
    "<td colspan = '8' class='text-center'>NO PRODUCTS AVAILABLE</td>";
  promaintable.appendChild(newrow);

  promaintable1.innerHTML = "";
  const newrow1 = document.createElement("tbody");
    newrow1.classList.add("newdata");
    newrow1.innerHTML = `<tr><td>No Products Sold</td></tr> `
    promaintable1.appendChild(newrow1)
    proYearlyPageLoop(1,1)
    }
  } catch (error) {
    window.location.href = '/admin/login'
    console.log(error.message)
  }
}

Yyear.addEventListener("change", () => {
  let year = Yyear.value;
  console.log(Yyear.value);
  fetchByYear(year);
});


yearbtn.addEventListener("click", () => {
  yearbuttons.style.display = "block";
  ypage.style.display = 'block'
  fetchByYear(2024)
  if (monthbuttons) {
    monthbuttons.style.display = "none";
  }
  if (weekbuttons) {
    weekbuttons.style.display = "none";
  }
  if (dailybuttons) {
    dailybuttons.style.display = "none";
  }
  if(wpage)
  {
    wpage.style.display = 'none'
  }
  if(mpage)
  {
    mpage.style.display = 'none'
  }
  if(dpage)
  {
    dpage.style.display = 'none'
  }
  if(page)
  {
    page.style.display = 'none'
  }
});


function proYearlyPageLoop(totalyearlypgcount, currentPage) {
  let beforepage = currentPage - 1;
  let afterpage = currentPage + 1;
  console.log("totW"+totalyearlypgcount)
  let active;

  if (currentPage === totalyearlypgcount && totalyearlypgcount != 1) {
    ypgmain.innerHTML = "";
    ypgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextYearlyPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    if (totalyearlypgcount < 4) {
      for (let i = beforepage; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        ypgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextYearlyPage(${i})">${i}</button>`;
      }
    } else {
      for (let i = beforepage - 2; i <= currentPage; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        ypgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextYearlyPage(${i})">${i}</button>`;
      }
    }

    if (currentPage != totalyearlypgcount) {
      ypgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextYearlyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    }
  } else if (currentPage === 1) {
    ypgmain.innerHTML = "";

    if (totalyearlypgcount > 2) {
      for (let i = beforepage; i <= afterpage + 2; i++) {
        if (currentPage === i) {
          active = "selectedbtn";
        } else {
          active = "";
        }
        if (i == 0) {
          continue;
        }
        ypgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextYearlyPage(${i})">${i}</button>`;
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
        ypgmain.innerHTML += `<button class="pagbtns ${active}" onclick="nextYearlyPage(${i})">${i}</button>`;
      }
    }
    if (currentPage != totalyearlypgcount) {
      ypgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextYearlyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      ypgmain.innerHTML += "";
    }
  } else if (currentPage > 1) {
    ypgmain.innerHTML = `<button class="pagbtns" id="leftbtn" onclick="nextYearlyPage(${
      currentPage - 1
    })"><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = beforepage; i <= afterpage; i++) {
      if (currentPage === i) {
        active = "selectedbtn";
      } else {
        active = "";
      }
      ypgmain.innerHTML += `<button class="pagbtns ${active}"  onclick="nextYearlyPage(${i})">${i}</button>`;
    }
    if (currentPage != totalyearlypgcount) {
      ypgmain.innerHTML += `<button id="rightbtn" class="pagbtns" onclick="nextYearlyPage(${
        currentPage + 1
      })"><i class="fa-solid fa-angle-right"></i></button>`;
    } else {
      ypgmain.innerHTML += "";
    }
  }

  console.log(currentPage);
}


const turnovertable = document.querySelector('#turnovertable')
const Dday1 = document.getElementById('Dday1')
const Dmonth1 = document.getElementById('Dmonth1')
const Dyear1 = document.getElementById('Dyear1')
const Wweek1 = document.getElementById('Wweek1')
const Wmonth1 = document.getElementById('Wmonth1')
const Wyear1 = document.getElementById('Wyear1')
const Mmonth1 = document.getElementById('Mmonth1')
const Myear1 = document.getElementById('Myear1')
const Yyear1 = document.getElementById('Yyear1')




async function fetchDailyTurnover(day,month,year)
{
  try {
    const res = await fetch(`/admin/salesreport/dailyturn?day=${day}&month=${month}&year=${year}`)
    const data = await res.json()
    if(data)
    {
      const newtbodyclass = document.querySelectorAll('.newtbodyclass')
      if(newtbodyclass)
      {
        newtbodyclass.forEach(el=>el.remove())
      }
      console.log(data)
      turnovertable.innerHTML = ''

      const newtbodyturn = document.createElement('tbody')
      newtbodyturn.classList.add('newtbodyclass')
      newtbodyturn.innerHTML = `<tr><th>Products Sold</th>
      <td>
        ${data.totalProducts}
        </td>

      </tr>
      <tr>
          <th>Customer Entries</th>
          <td>  ${data.totalUsers}
          </td>

      </tr>
      <tr>
          <th>Orders Placed</th>
          <td>${data.totalOrders}
          </td>

      </tr>
      <tr>
          <th>Revenue </th>
          <td>Rs.${data.totalRevenue}</td>

      </tr>
      <tr>
          <th>Expenses</th>
          <td>Rs.0</td>

      </tr>`

      turnovertable.appendChild(newtbodyturn)
    }
  } catch (error) {
    window.location.href = '/admin/login'
    console.log(error.message)
  }
}

Dday1.addEventListener("change", () => {
  let day = Dday1.value;
  let month = Dmonth1.value;
  let year = Dyear1.value;
  console.log(Dday1.value);
  console.log(Dmonth1.value);
  console.log(Dyear1.value);
  fetchDailyTurnover(day, month, year);
});
Dmonth1.addEventListener("change", () => {

  let day = Dday1.value;
  let month = Dmonth1.value;
  let year = Dyear1.value;
  console.log(Dday1.value);
  console.log(Dmonth1.value);
  console.log(Dyear1.value);
  fetchDailyTurnover(day, month, year);
});
Dyear1.addEventListener("change", () => {

  let day = Dday1.value;
  let month = Dmonth1.value;
  let year = Dyear1.value;
  console.log(Dday1.value);
  console.log(Dmonth1.value);
  console.log(Dyear1.value);
  fetchDailyTurnover(day, month, year);
});

dailybtn1.addEventListener("click", () => {
  dailybuttons1.style.display = "block";
  let day = Dday1.value;
  let month = Dmonth1.value;
  let year = Dyear1.value;
  fetchDailyTurnover(day, month, year);
  if (weekbuttons1) {
    weekbuttons1.style.display = "none";
  }
  if (monthbuttons1) {
    monthbuttons1.style.display = "none";
  }
  if (yearbuttons1) {
    yearbuttons1.style.display = "none";
  }
});


async function fetchWeeklyTurnover(week,month,year){
  try {
    const res = await fetch(`/admin/salesreport/weeklyturn?week=${week}&month=${month}&year=${year}`)
    const data = await res.json()
    if(data)
    {
      const newtbodyclass = document.querySelectorAll('.newtbodyclass')
      if(newtbodyclass)
      {
        newtbodyclass.forEach(el=>el.remove())
      }
      console.log(data)
      turnovertable.innerHTML = ''

      const newtbodyturn = document.createElement('tbody')
      newtbodyturn.classList.add('newtbodyclass')
      newtbodyturn.innerHTML = `<tr><th>Products Sold</th>
      <td>
        ${data.totalProducts}
        </td>

      </tr>
      <tr>
          <th>Customer Entries</th>
          <td>  ${data.totalUsers}
          </td>

      </tr>
      <tr>
          <th>Orders Placed</th>
          <td>${data.totalOrders}
          </td>

      </tr>
      <tr>
          <th>Revenue </th>
          <td>Rs.${data.totalRevenue}</td>

      </tr>
      <tr>
          <th>Expenses</th>
          <td>Rs.0</td>

      </tr>`

      turnovertable.appendChild(newtbodyturn)
    }
  } catch (error) {
    console.log(error.message)
    window.location.href = '/admin/login'
  }
}

Wweek1.addEventListener("change", () => {
  let week = Wweek1.value;
  let month = Wmonth1.value;
  let year = Wyear1.value;
  console.log(Wweek1.value);
  console.log(Wmonth1.value);
  console.log(Wyear1.value);
  fetchWeeklyTurnover(week, month, year);
});
Wmonth1.addEventListener("change", () => {
  let week = Wweek1.value;
  let month = Wmonth1.value;
  let year = Wyear1.value;
  console.log(Wweek1.value);
  console.log(Wmonth1.value);
  console.log(Wyear1.value);
  fetchWeeklyTurnover(week, month, year);
});
Wyear1.addEventListener("change", () => {
  let week = Wweek1.value;
  let month = Wmonth1.value;
  let year = Wyear1.value;
  console.log(Wweek1.value);
  console.log(Wmonth1.value);
  console.log(Wyear1.value);
  fetchWeeklyTurnover(week, month, year);
});

weekbtn1.addEventListener("click", () => {
  weekbuttons1.style.display = "block";
  let week = Wweek1.value;
  let month = Wmonth1.value;
  let year = Wyear1.value;
  fetchWeeklyTurnover(week, month, year);
  if (monthbuttons1) {
    monthbuttons1.style.display = "none";
  }
  if (yearbuttons1) {
    yearbuttons1.style.display = "none";
  }
  if (dailybuttons1) {
    dailybuttons1.style.display = "none";
  }
});


async function fetchMonthlyTurnover(month,year){
  try {
    const res = await fetch(`/admin/salesreport/monthlyturn?month=${month}&year=${year}`)
    const data = await res.json()
    if(data)
    {
      console.log(data)
      const newtbodyclass = document.querySelectorAll('.newtbodyclass')
      if(newtbodyclass)
      {
        newtbodyclass.forEach(el=>el.remove())
      }
      console.log(data)
      turnovertable.innerHTML = ''

      const newtbodyturn = document.createElement('tbody')
      newtbodyturn.classList.add('newtbodyclass')
      newtbodyturn.innerHTML = `<tr><th>Products Sold</th>
      <td>
        ${data.totalProducts}
        </td>

      </tr>
      <tr>
          <th>Customer Entries</th>
          <td>  ${data.totalUsers}
          </td>

      </tr>
      <tr>
          <th>Orders Placed</th>
          <td>${data.totalOrders}
          </td>

      </tr>
      <tr>
          <th>Revenue </th>
          <td>Rs.${data.totalRevenue}</td>

      </tr>
      <tr>
          <th>Expenses</th>
          <td>Rs.0</td>

      </tr>`

      turnovertable.appendChild(newtbodyturn)
    }
  } catch (error) {
    window.location.href = '/admin/login'
    console.log(error.message)
  }
}

Mmonth1.addEventListener("change", () => {
  let month = Mmonth1.value;
  let year = Myear1.value;
  console.log(Mmonth1.value);
  console.log(Myear1.value);
  fetchMonthlyTurnover(month, year);
});
Myear1.addEventListener("change", () => {
  let month = Mmonth1.value;
  let year = Myear1.value;
  console.log(Mmonth1.value);
  console.log(Myear1.value);
  fetchMonthlyTurnover(month, year);
});



monthbtn1.addEventListener("click", () => {
  monthbuttons1.style.display = "block";
  let month = Mmonth1.value;
  let year = Myear1.value;
  fetchMonthlyTurnover(month, year);
  if (weekbuttons1) {
    weekbuttons1.style.display = "none";
  }
  if (yearbuttons1) {
    yearbuttons1.style.display = "none";
  }
  if (dailybuttons1) {
    dailybuttons1.style.display = "none";
  }
});


async function fetchYearlyTurnover(year)
{
  try {
    const res = await fetch(`/admin/salesreport/yearlyturn?year=${year}`)
    const data = await res.json()
    if(data)
    {
      console.log(data)
      const newtbodyclass = document.querySelectorAll('.newtbodyclass')
      if(newtbodyclass)
      {
        newtbodyclass.forEach(el=>el.remove())
      }
      console.log(data)
      turnovertable.innerHTML = ''

      const newtbodyturn = document.createElement('tbody')
      newtbodyturn.classList.add('newtbodyclass')
      newtbodyturn.innerHTML = `<tr><th>Products Sold</th>
      <td>
        ${data.totalProducts}
        </td>

      </tr>
      <tr>
          <th>Customer Entries</th>
          <td>  ${data.totalUsers}
          </td>

      </tr>
      <tr>
          <th>Orders Placed</th>
          <td>${data.totalOrders}
          </td>

      </tr>
      <tr>
          <th>Revenue </th>
          <td>Rs.${data.totalRevenue}</td>

      </tr>
      <tr>
          <th>Expenses</th>
          <td>Rs.0</td>

      </tr>`

      turnovertable.appendChild(newtbodyturn)
    }
  } catch (error) {
    window.location.href = '/admin/login'
    console.log(error.message)
  }
}

Yyear1.addEventListener("change", () => {
  let year = Yyear1.value;
  console.log(Yyear1.value);
  fetchYearlyTurnover(year);
});

yearbtn1.addEventListener("click", () => {
  yearbuttons1.style.display = "block";
  let year = Yyear1.value;
  fetchYearlyTurnover(year);
  if (monthbuttons1) {
    monthbuttons1.style.display = "none";
  }
  if (weekbuttons1) {
    weekbuttons1.style.display = "none";
  }
  if (dailybuttons1) {
    dailybuttons1.style.display = "none";
  }
});
