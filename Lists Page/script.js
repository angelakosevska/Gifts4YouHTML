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
    addItemButton.style.display = "none"; // Hide the add-item button
    addItemBtn.style.display = "block"; // Ensure the add-item-btn button is visible
  }
});

// Close add item form
closeButton.addEventListener("click", function () {
  console.log("Closing popup");
  addItemWrapper.classList.remove("active"); // Hide the popup
  addItemButton.style.display = "block"; // Show the add-item button
  addItemBtn.style.display = "none"; // Hide the add-item-btn button
});

// Save items to localStorage
function saveItemsToLocalStorage(items) {
  console.log("Saving items to localStorage:", items);
  localStorage.setItem("giftListItems", JSON.stringify(items));
}

// Load items from localStorage
function loadItemsFromLocalStorage() {
  const items = localStorage.getItem("giftListItems");
  console.log("Loaded items from localStorage:", items ? JSON.parse(items) : []);
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
    giftList.appendChild(listItem);
  });
}


// Handle add item form submission
function handleAddItem() {
  console.log("Handling add item");

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
function deleteItems() {
  localStorage.clear();
}
