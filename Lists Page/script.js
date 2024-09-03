document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.parentElement.style.opacity = '0.5'; // Dim the item to show it's taken
            } else {
                this.parentElement.style.opacity = '1';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const addItemButton = document.querySelector(".add-item");
    const addItemWrapper = document.querySelector(".add-item-wrapper");
    const closeButton = document.querySelector(".close");

    addItemButton.addEventListener("click", function () {
      addItemWrapper.classList.toggle("active");
    });

    closeButton.addEventListener("click", function () {
      addItemWrapper.classList.remove("active");
    });
  });


  // Function to create a new list item
function createListItem(item) {
    const listItem = document.createElement('li');
    listItem.classList.add('gift-item');
    listItem.innerHTML = `
      <div class="gift-details">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank">Buy Online</a>
        <p>${item.notes}</p>
      </div>
      <div class="got-it">
        <input type="checkbox" id="item${item.id}" name="item${item.id}" class="checkbox" />
        <label for="item${item.id}">I'll get it</label>
      </div>
    `;
    return listItem;
  }
  
  // Function to save items to local storage
  function saveToLocalStorage(items) {
    localStorage.setItem('giftList', JSON.stringify(items));
  }
  
  // Function to load items from local storage
  function loadFromLocalStorage() {
    const storedItems = localStorage.getItem('giftList');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  
  // Function to add an item
  function addItem() {
    const name = document.querySelector('.item-name').value;
    const description = document.querySelector('.item-description').value;
    const link = document.querySelector('.item-link').value;
    const notes = document.querySelector('.item-notes').value;
  
    if (name && description && link) {
      const items = loadFromLocalStorage();
      const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        name,
        description,
        link,
        notes
      };
  
      items.push(newItem);
      saveToLocalStorage(items);
  
      const list = document.getElementById('gift-list');
      list.appendChild(createListItem(newItem));
  
      // Clear the input fields
      document.querySelector('.item-name').value = '';
      document.querySelector('.item-description').value = '';
      document.querySelector('.item-link').value = '';
      document.querySelector('.item-notes').value = '';
  
      // Close the add item section
      document.querySelector('.add-item-wrapper').style.display = 'none';
    } else {
      alert('Please fill out all required fields.');
    }
  }
  
  // Load items from local storage when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    const items = loadFromLocalStorage();
    const list = document.getElementById('gift-list');
    items.forEach(item => {
      list.appendChild(createListItem(item));
    });
  });
  
  // Add event listener to the "Add Item" button
  document.querySelector('.add-item-btn').addEventListener('click', addItem);
  
  // Add event listener to the close button of the add item section
  document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.add-item-wrapper').style.display = 'none';
  });
  
  // Add event listener to the main "Add Item" button
  document.querySelector('.add-item').addEventListener('click', () => {
    document.querySelector('.add-item-wrapper').style.display = 'block';
  });
  