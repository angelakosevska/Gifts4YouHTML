let currentMonth = document.querySelector(".current-month");
let calendarDays = document.querySelector(".calendar-days");
let today = new Date();
let date = new Date();
let selectedDateElement = null;
//for uploading profile photo
document.addEventListener('DOMContentLoaded', function() {
  function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function(e) {
              var profilePic = document.querySelector('.profile-pic');
              if (profilePic) {
                  profilePic.src = e.target.result;
              }
          }
6
          reader.readAsDataURL(input.files[0]);
      }
  }
  var fileUpload = document.querySelector('.file-upload');
  if (fileUpload) {
      fileUpload.addEventListener('change', function() {
          readURL(this);
      });
  }

  var uploadButton = document.querySelector('.upload-button');
  if (uploadButton) {
      uploadButton.addEventListener('click', function() {
          if (fileUpload) {
              fileUpload.click();
          }
      });
  }
  });
  //for uploading a post
  document.addEventListener('DOMContentLoaded', function() {
    // Function to handle adding a new item (post, collection, people, or event)
    function addNewItem(type, title, content, imageUrl) {
        const rightCol = document.querySelector('.right-col');

        // Create a new card element
        const newCard = document.createElement('div');
        newCard.classList.add('card');

        // Set the content of the card based on the type
        if (type === 'post') {
            newCard.innerHTML = `
                <h2>${title}</h2>
                <img src="${imageUrl}" alt="${title}" class="post-image">
                <p>${content}</p>
            `;
        } else if (type === 'collection') {
            newCard.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
        } else if (type === 'people') {
            newCard.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
        } else if (type === 'event') {
            newCard.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
        }

        // Append the new card to the right column
        rightCol.appendChild(newCard);
    }

    // Add event listeners to the .add button links
    const addButtons = document.querySelectorAll('.add a');
    addButtons.forEach((button, index) => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            let modal;
            if (index === 0) {
                modal = document.getElementById('addCollectionModal');
            } else if (index === 1) {
                modal = document.getElementById('addPostModal');
            } else if (index === 2) {
                modal = document.getElementById('addPersonModal');
            } else if (index === 3) {
                modal = document.getElementById('addEventModal');
            }

            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    // Close modals
    const closeModalButtons = document.querySelectorAll('.modal .close');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            button.closest('.modal').style.display = "none";
        });
    });

    // Handle form submission for adding posts
    document.getElementById('addPostForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const imageInput = document.getElementById('postImage');

        // Read the uploaded image file
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                addNewItem('post', title, content, imageUrl);
                document.getElementById('addPostModal').style.display = "none";
            }
            reader.readAsDataURL(imageInput.files[0]);
        }
    });

    // Handle form submission for adding collections
    document.getElementById('addCollectionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('collectionTitle').value;
        const content = document.getElementById('collectionDescription').value;
        addNewItem('collection', title, content);
        document.getElementById('addCollectionModal').style.display = "none";
    });

    // Handle form submission for adding people
    document.getElementById('addPersonForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('personName').value;
        const content = document.getElementById('personDetails').value;
        addNewItem('people', title, content);
        document.getElementById('addPersonModal').style.display = "none";
    });

    // Handle form submission for adding events
    document.getElementById('addEventForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('eventName').value;
        const content = document.getElementById('eventDetails').value;
        addNewItem('event', title, content);
        document.getElementById('addEventModal').style.display = "none";
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    });
});





let events = {
  "2024-08-14": [
    { name: "Baby Shower", user: "Jane Doe" },
    { name: "Birthday Party", user: "John Smith" },
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


document.addEventListener('DOMContentLoaded', function() {

  function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function(e) {
              var profilePic = document.querySelector('.profile-pic');
              if (profilePic) {
                  profilePic.src = e.target.result;
              }
          }

          reader.readAsDataURL(input.files[0]);
      }
  }

  var fileUpload = document.querySelector('.file-upload');
  if (fileUpload) {
      fileUpload.addEventListener('change', function() {
          readURL(this);
      });
  }

  var uploadButton = document.querySelector('.upload-button');
  if (uploadButton) {
      uploadButton.addEventListener('click', function() {
          if (fileUpload) {
              fileUpload.click();
          }
      });
  }

  });