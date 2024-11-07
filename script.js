
const formItem = document.getElementById('formElement')
const formInput = document.getElementById('input')
const filter = document.getElementById('filterInput')
const ul = document.getElementById('ul')
const clearButton = document.getElementById('clrBtn')

// Event Listeners
formItem.addEventListener('submit', addItem)
ul.addEventListener('click', removeItem)
clearButton.addEventListener('click', clearAll)
filter.addEventListener('input', filterItem)
checkUI()

// Add items to DOM
function addItem(e) {
    e.preventDefault();
    const newItem = formInput.value

    if (newItem === '') {
        alert('pls input an item');
        return;
    }

    addItemToDOM(newItem)

    addItemToStorage(newItem)


}

function addItemToDOM(item) {

    const li = document.createElement('li')
    const value = document.createTextNode(item)
    li.appendChild(value)

    const btn = createButton('removeItemBtn textRed')
    li.appendChild(btn)
    ul.appendChild(li)
    checkUI()
    formInput.value = ''

}

function createButton(classes) {
    const rmvbtn = document.createElement('button');
    rmvbtn.className = classes;
    rmvbtn.appendChild(createIcon('x'));
    return rmvbtn
}

function createIcon(element) {
    const icon = document.createElement('i');
    icon.appendChild(document.createTextNode(element));
    return icon
}



function removeItem(e) {
    if (e.target.parentElement.classList.contains('removeItemBtn')) {
        const itemToRemove = e.target.parentElement.parentElement.firstChild.textContent; // Get the item text
        e.target.parentElement.parentElement.remove();
        removeItemFromStorage(itemToRemove)
        checkUI();
    }
}

function clearAll() {
    if (confirm('Are you sure!')) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild)
        }
    }
    checkUI()
    //clear items from localStorage
    localStorage.removeItem('items')
}

function checkUI() {
    const items = document.querySelectorAll('li')
    if (items.length === 0) {
        filter.style.display = 'none';
        clearButton.style.display = 'none'
    }
    else {
        filter.style.display = 'block'
        clearButton.style.display = 'block'
    }
}


function filterItem(e) {
    const li = ul.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    li.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.includes(text)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}
// OR USING indexOf() METHOD
// function filterItem(e) {
//     const li = ul.querySelectorAll('li');
//     const text = e.target.value.toLowerCase();
//     li.forEach(
//         (item) => {
//             const itemName = item.firstChild.textContent.toLowerCase();
//             console.log(itemName);
//             if (itemName.indexOf(text) != -1) {
//                 item.style.display = 'flex';
//             } else {
//                 item.style.display = 'none';
//             }
//         })
// }


// THE LOCAL STORAGE

// Adding to local storage
function addItemToStorage(item) {
    let itemsFromStorage = [];
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    // Add new item to the array
    itemsFromStorage.push(item);

    //Convert to Json string and set to the localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Getting item from localStorage
function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

//Display Item From localStorage to DOM
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
}
displayItems();

// remove item from localStorage
function removeItemFromStorage(itemText) {
    let itemsFromStorage = getItemsFromStorage();

    // Find the index of the item to remove
    const itemIndex = itemsFromStorage.indexOf(itemText);

    // Remove item if found
    if (itemIndex > -1) {
        itemsFromStorage.splice(itemIndex, 1);
    }

    // Update localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
