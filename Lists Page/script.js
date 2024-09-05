// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  renderItems(); // Render items on page load
});

// Select necessary elements
const addItemButton = document.querySelector(".add-item");
const addItemWrapper = document.querySelector(".add-item-wrapper");
const closeButton = document.querySelector(".close");
const addItemBtn = document.querySelector(".add-item-btn");
const giftList = document.querySelector("#gift-list");

// Handle button click
addItemButton.addEventListener("click", function () {
  if (addItemWrapper.classList.contains("active")) {
    handleAddItem();
  } else {
    console.log("Opening popup");
    addItemWrapper.classList.add("active"); // Show the popup
    addItemBtn.style.display = "block"; // Ensure the add-item-btn button is visible
  }
});

// Close add item form
closeButton.addEventListener("click", function () {
  console.log("Closing popup");
  addItemWrapper.classList.remove("active"); // Hide the popup
  addItemButton.style.display = "block"; // Show the add-item button
});

// Save items to localStorage
function saveItemsToLocalStorage(items) {
  console.log("Saving items to localStorage:", items);
  localStorage.setItem("giftListItems", JSON.stringify(items));
}

// Load items from localStorage
function loadItemsFromLocalStorage() {
  const items = localStorage.getItem("giftListItems");
  console.log(
    "Loaded items from localStorage:",
    items ? JSON.parse(items) : []
  );
  return items ? JSON.parse(items) : [];
}

// Render items in the gift list
function renderItems() {
  const items = loadItemsFromLocalStorage();
  giftList.innerHTML = ""; // Clear existing items

  items.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("gift-item");
    listItem.innerHTML = `
      <div class="gift-details">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Buy Online</a>
        <p>${item.notes}</p>
      </div>
      <div class="got-it">
        <input type="checkbox" id="item${index}" name="item${index}" class="checkbox" />
        <label for="item${index}">I'll get it</label>
      </div>
    `;
    giftList.insertBefore(listItem, giftList.firstChild);
  });
  // Add event listeners to new checkboxes
  addCheckboxListeners();
}

// Handle add item form submission
function handleAddItem() {
  // Get input values
  const itemName = document.querySelector(".item-name").value;
  const itemDescription = document.querySelector(".item-description").value;
  const itemLink = document.querySelector(".item-link").value;
  const itemNotes = document.querySelector(".item-notes").value;

  // Validate inputs
  if (!itemName.trim()) {
    alert("Item name is required.");
    return;
  }

  // Load existing items
  const items = loadItemsFromLocalStorage();

  // Add new item
  items.push({
    name: itemName,
    description: itemDescription,
    link: itemLink,
    notes: itemNotes,
  });

  // Save updated items
  saveItemsToLocalStorage(items);

  // Render updated list
  renderItems();

  // Clear form fields after adding
  document.querySelector(".item-name").value = "";
  document.querySelector(".item-description").value = "";
  document.querySelector(".item-link").value = "";
  document.querySelector(".item-notes").value = "";

  // Hide form after adding
  addItemWrapper.classList.remove("active");
  addItemButton.style.display = "block"; // Show the add-item button
}

// Handle checkbox change
function handleCheckboxChange(event) {
  const checkbox = event.target;
  const listItem = checkbox.closest(".gift-item");

  // Find the .gift-details and the checkbox label
  const giftDetails = listItem.querySelector(".gift-details");
  const label = listItem.querySelector(".got-it label");

  if (checkbox.checked) {
    giftDetails.classList.add("checked-item");
    listItem.classList.add("checked-item");
  } else {
    giftDetails.classList.remove("checked-item");
    listItem.classList.remove("checked-item");
  }
}

// Add event listeners to checkboxes
function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
}

// Initial call to add event listeners
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  renderItems(); // Render items on page load
  addCheckboxListeners(); // Add event listeners to existing checkboxes
});
