// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  renderItems(); // Render items on page load
  addCheckboxListeners(); // Add event listeners to existing checkboxes
  loadEventDetails(); // Load event details on page load
});

// Select necessary elements for add item
const addItemButton = document.querySelector(".add-item");
const addItemWrapper = document.querySelector(".add-item-wrapper");
const closeButton = document.querySelector(".close");
const addItemBtn = document.querySelector(".add-item-btn");
const giftList = document.querySelector("#gift-list");
const submitItemButton = document.querySelector(".submit-item-btn");

// Handle add item button click
addItemButton.addEventListener("click", function () {
  closeAllModals(); // Ensure other modals are closed
  addItemWrapper.classList.add("active"); // Show the popup
  addItemBtn.style.display = "block"; // Ensure the add-item-btn button is visible
});

// Handle item submission
submitItemButton.addEventListener("click", function () {
  handleAddItem(); // Call the function to handle adding the item
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
        <a href="${item.link}" target="_blank">Link</a>
        <p>${item.notes}</p>
      </div>
      <div class="got-it">
        <input type="checkbox" id="item${index}" name="item${index}" class="checkbox" ${item.checked ? 'checked' : ''} />
        <label for="item${index}">I'll get it</label>
      </div>
    `;
    giftList.appendChild(listItem);
  });
  // Add event listeners to new checkboxes
  addCheckboxListeners();
}

// Handle add item form submission
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

  // Add new item at the top of the unchecked items
  items.unshift({ // Using unshift to add to the beginning of the array
    name: itemName,
    description: itemDescription,
    link: itemLink,
    notes: itemNotes,
    checked: false // Initialize as unchecked
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

// Rearrange items based on checked status
function rearrangeItems() {
  const items = loadItemsFromLocalStorage();
  const checkedItems = items.filter(item => item.checked);
  const uncheckedItems = items.filter(item => !item.checked);
  
  // Rearranged items: all unchecked items first, then checked items
  const rearrangedItems = [...uncheckedItems, ...checkedItems];

  // Save rearranged items
  saveItemsToLocalStorage(rearrangedItems);
  
  // Render updated list
  renderItems();
}


// Handle checkbox change
function handleCheckboxChange(event) {
  const checkbox = event.target;
  const listItem = checkbox.closest(".gift-item");
  const index = Array.from(giftList.children).indexOf(listItem);

  // Load existing items
  const items = loadItemsFromLocalStorage();

  // Update the checked status of the item
  items[index].checked = checkbox.checked;

  // Save updated items
  saveItemsToLocalStorage(items);

  // Rearrange items based on their checked status
  rearrangeItems();
}

// Rearrange items based on checked status
function rearrangeItems() {
  const items = loadItemsFromLocalStorage();
  const checkedItems = items.filter(item => item.checked);
  const uncheckedItems = items.filter(item => !item.checked);
  const rearrangedItems = [...uncheckedItems, ...checkedItems]; // Unchecked first, then checked

  // Save rearranged items
  saveItemsToLocalStorage(rearrangedItems);
  
  // Render updated list
  renderItems();
}

// Add event listeners to checkboxes
function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxChange);
  });
}

// Close all modals
function closeAllModals() {
  addItemWrapper.classList.remove("active"); // Hide add item popup
  editEventWrapper.classList.remove("active"); // Hide edit event popup
}

// For edit event popup
const editEventButton = document.querySelector(".edit-btn");
const editEventWrapper = document.querySelector(".edit-event-wrapper");
const editCloseButton = document.querySelector(".edit-event-wrapper .closeEdit");
const saveEditButton = document.querySelector(".save-edit-btn");

// Handle edit button click
editEventButton.addEventListener("click", function () {
  closeAllModals(); // Ensure other modals are closed
  editEventWrapper.classList.add("active"); // Show the popup
  loadEventDetails(); // Load event details into form fields
});

// Close edit event form
editCloseButton.addEventListener("click", function () {
  console.log("Closing edit event popup");
  editEventWrapper.classList.remove("active"); // Hide the popup
});

//localStorage.removeItem("giftListItems");
//izbrishi go ova ko kj evnesvash ubaj itemi