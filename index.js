var allItemElems = [];

function showCreateItemModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createItemModal = document.getElementById('create-item-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createItemModal.classList.remove('hidden');

}

function closeCreateItemModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createItemModal = document.getElementById('create-item-modal');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createItemModal.classList.add('hidden');

  clearItemInputValues();

}

/*
 * This function clears any value present in any of the twit input elements.
 */
function clearItemInputValues() {

  var itemInputElems = document.getElementsByClassName('item-input-element');
  for (var i = 0; i < itemInputElems.length; i++) {
    var input = itemInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

function generateNewItemElem(itemText, itemAuthor) {

  var itemTemplate = Handlebars.templates.item;
  var itemData = {
    name: itenName,
    description: itemDescription,
    location: itemLocation,
    photos: itemPhoto
  };

  return itemTemplate(itemData);

}

function insertNewItem() {

  var itemName = document.getElementById('twit-name-input').value;
  var itemLocation = document.getElementById('twit-location-input').value;
  var itemDescription = document.getElementById('twit-name-input').value;
  var itemPhoto = document.getElementById('twit-photo-input').src;
  /*
   * Only generate the new twit if the user supplied values for both the twit
   * text and the twit attribution.  Give them an alert if they didn't.
   */
  if (itemName && itemLocation && itemDescription && itemPhoto) {

      var newItemElem = generateNewItemElem(itemName, itemLocation, itemDescription, itemPhoto);
      var itemContainer = document.querySelector('.item-container');
      itemContainer.insertAdjacentHTML('beforeend', newItemElem);
      allItemElems.push(newItemElem);

      closeCreateItemModal();

  } else {

    alert('You must specify both the name, the location, the photo and the description of the item!');

  }
}

function doItemSearch() {

  // Grab the search query, make sure it's not null, and do some preproessing.
  var searchQuery = document.getElementById('navbar-search-input').value;
  searchQuery = searchQuery ? searchQuery.trim().toLowerCase() : '';

  // Remove all twits from the twit container temporarily.
  var itemContainer = document.querySelector('.item-container');
  while (itemContainer.lastChild) {
    itemContainer.removeChild(itemContainer.lastChild);
  }

  /*
   * Loop through the collection of all twits and add twits back into the DOM
   * if they contain the search term or if the search term is empty.
   */
  allItemElems.forEach(function (itemElem) {
    if (!searchQuery || itemElem.textContent.toLowerCase().indexOf(searchQuery) !== -1) {
      itemContainer.appendChild(itemElem);
    }
  });

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  // Remember all of the existing twits in an array that we can use for search.
  var itemElemsCollection = document.getElementsByClassName('item');
  for (var i = 0; i < itemElemsCollection.length; i++) {
    allItemElems.push(itemElemsCollection[i]);
  }

  var createItemButton = document.getElementById('create-item-button');
  createItemButton.addEventListener('click', showCreateItemModal);

  var modalCloseButton = document.querySelector('#create-item-modal .modal-close-button');
  modalCloseButton.addEventListener('click', closeCreateItemModal);

  var modalCancalButton = document.querySelector('#create-item-modal .modal-cancel-button');
  modalCancalButton.addEventListener('click', closeCreateItemModal);

  var modalAcceptButton = document.querySelector('#create-itemt-modal .modal-accept-button');
  modalAcceptButton.addEventListener('click', insertNewItem);

  var searchButton = document.getElementById('navbar-search-button');
  searchButton.addEventListener('click', doItemSearch);

  var searchInput = document.getElementById('navbar-search-input');
  searchInput.addEventListener('input', doItemSearch);

});
