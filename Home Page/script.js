let currentMonth = document.querySelector(".current-month");
let calendarDays = document.querySelector(".calendar-days");
let today = new Date();
let date = new Date();
let selectedDateElement = null;

let events = {
  "2024-09-19": [
    { name: "Ispit OVI", user: "KV" },
  ],
  "2024-09-27": [
    { name: "Ispit WP", user: "NBT" },
  ],
  "2024-09-30": [
    { name: "Birthday party", user: "@ema922" },
  ],
};

currentMonth.textContent = date.toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});
today.setHours(0, 0, 0, 0);
renderCalendar();

function renderCalendar() {
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const totalMonthDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const startWeekDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDay();

  calendarDays.innerHTML = "";

  let totalCalendarDay = 6 * 7;
  for (let i = 0; i < totalCalendarDay; i++) {
    let day = i - startWeekDay;
    let fullDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (i <= startWeekDay) {
      // adding previous month days
      calendarDays.innerHTML += `<div class='padding-day'>${
        prevLastDay - i
      }</div>`;
    } else if (i <= startWeekDay + totalMonthDay) {
      // adding this month days
      date.setDate(day);
      date.setHours(0, 0, 0, 0);

      let dayClass =
        date.getTime() === today.getTime() ? "current-day" : "month-day";
        calendarDays.innerHTML += `<div class='${dayClass}' data-date='${fullDate}'>${day}</div>`;
    } else {
      // adding next month days
      calendarDays.innerHTML += `<div class='padding-day'>${
        day - totalMonthDay
      }</div>`;
    }
  }
  // Add click event to calendar days
  document.querySelectorAll(".month-day").forEach((dayElement) => {
    dayElement.addEventListener("click", function (e) {
      let date = this.getAttribute("data-date");
      showEventPopup(date, e);
    });
  });
}

function showEventPopup(date, event) {
  const popup = document.getElementById("eventPopup");
  const preview = popup.querySelector(".event-preview");
  const eventData = events[date] || [];

  if (selectedDateElement) {
    selectedDateElement.style.backgroundColor = "";
    selectedDateElement.style.borderRadius = "";
    selectedDateElement.style.color = "";
  }
  selectedDateElement = event.target;
  selectedDateElement.style.backgroundColor = "#bda3f8";
  selectedDateElement.style.borderRadius = "50%";
  selectedDateElement.style.color = "#0";

  preview.innerHTML =
    eventData.length > 0
      ? eventData
          .map(
            (event) =>
              `<div><strong>${event.name}</strong> by ${event.user}</div>`
          )
          .join("")
      : "<div>No events for this day.</div>";

  popup.style.display = "block";
  popup.style.left = `${event.pageX + 10}px`; // Position to the right of the click
  popup.style.top = `${event.pageY + 10}px`; // Position below the click
}

// Hide the popup when clicking outside
document.addEventListener("click", function (event) {
  const popup = document.getElementById("eventPopup");
  if (
    !popup.contains(event.target) &&
    !event.target.classList.contains("month-day")
  ) {
    popup.style.display = "none";
    if (selectedDateElement) {
      selectedDateElement.style.backgroundColor = "";
      selectedDateElement.style.borderRadius = "";
      selectedDateElement.style.color = "";
      selectedDateElement = null; // Clear the reference
    }
  }
});

document.querySelectorAll(".month-btn").forEach(function (element) {
  element.addEventListener("click", function () {
    date = new Date(currentMonth.textContent);
    date.setMonth(
      date.getMonth() + (element.classList.contains("prev") ? -1 : 1)
    );
    currentMonth.textContent = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    renderCalendar();
  });
});

document.querySelectorAll(".btn").forEach(function (element) {
  element.addEventListener("click", function () {
    let btnClass = element.classList;
    date = new Date(currentMonth.textContent);
    if (btnClass.contains("today")) date = new Date();
    else if (btnClass.contains("prev-year"))
      date = new Date(date.getFullYear() - 1, 0, 1);
    else date = new Date(date.getFullYear() + 1, 0, 1);

    currentMonth.textContent = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    renderCalendar();
  });
});



//for calendar and users

//hide
document.getElementById('toggleCalendar').addEventListener('click', function () {
  const calendarSection = document.getElementById('calendarSection');
  const usersSection = document.getElementById('usersSection');

  if (calendarSection.classList.contains('d-none')) {
    calendarSection.classList.remove('d-none');
    calendarSection.classList.add('d-block');
    usersSection.classList.remove('d-block');
    usersSection.classList.add('d-none');
  } else {
    calendarSection.classList.remove('d-block');
    calendarSection.classList.add('d-none');
  }
});

document.getElementById('toggleUsers').addEventListener('click', function () {
  const usersSection = document.getElementById('usersSection');
  const calendarSection = document.getElementById('calendarSection');

  if (usersSection.classList.contains('d-none')) {
    usersSection.classList.remove('d-none');
    usersSection.classList.add('d-block');
    calendarSection.classList.remove('d-block');
    calendarSection.classList.add('d-none');
  } else {
    usersSection.classList.remove('d-block');
    usersSection.classList.add('d-none');
  }
});

