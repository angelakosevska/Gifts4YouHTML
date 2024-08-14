const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = `${months[month]} ${year}`;

    let days = "";
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDate; i++) {
        if (i == new Date().getDate() && 
            year == new Date().getFullYear() && 
            month == new Date().getMonth()) {
            days += `<div class="day today">${i}</div>`;
        } else {
            days += `<div class="day">${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
}

        initCalendar();
        function prevMonth(){
            month--;
            if(month < 0){
                month = 11;
                year--;
            }
            initCalendar();
        }
        function nextMonth(){
            month++;
            if(month>11){
                month=0;
                year++;
            }
            initCalendar();
        }

        prev.addEventListener("click" , prevMonth);
        next.addEventListener("click" , nextMonth);

        todayBtn.addEventListener("click", () => {
            today = new Date();
            month = today.getMonth();
            year = today.getFullYear();
            initCalendar();
        });

        dateInput.addEventListener("input" ,  (e)=> {
            dateInput.value=dateInput.value.replace(/[^0-9/]/g , "");
            if(dateInput.value.length== 2 ){
                dateInput.value += "/";
            }
            if(dateInput.value.length > 7){
                dateInput.value= dateInput.value.slice(0, 7);
            }
           
            if(e.inputType == "deleteContentBackwards"){
                if(dateInput.value.length == 3){
                    dateInput.value - dateInput.value.slice(0, 2);
                }
            }
        });

gotoBtn.addEventListener("click", gotoDate);
function gotoDate(){
    const dateArr = dateInput.value.split("/");
    if(dateArr.length == 2){
        if(dateArr[0] > 0 &&
            dateArr[0] < 13 && 
            dateArr[1].length ==4
        ){
            month=dateArr[0] - 1;
            year=dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("invalid date");
}