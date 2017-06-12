
var modal_backdrop = document.getElementById('modal-backdrop');
//var modal_backdrop = document.getElementsByClassName('hidden');???
var create_item_modal = document.getElementById('create-item-modal');
var name_input = document.getElementById('item-name-input');
var description_input = document.getElementById('item-description-input');
var location_input = document.getElementById('item-location-input');
var image_url = document.getElementById('item-image-input');
var image_input = image_url.src;

var item_container = document.querySelector('.item-container');
var item = document.querySelectorAll('.item');

var create_itemer = document.querySelector('#create-item-button');
create_itemer.addEventListener('click', function () {
  modal_backdrop.style.display="block";
  create_item_modal.style.display="block";
  console.log("The create-item button was clicked");
});

var close_itemer = document.querySelector('.modal-close-button');
close_itemer.addEventListener('click', function () {
   		image_url.value = "";
   		name_input.value = "";
  		location_input.value = "";
  		description_input.value = "";
  console.log("The input was cleared since closed");
  modal_backdrop.style.display="none";
  create_item_modal.style.display="none";
  console.log("And create-itemer window was closed");
});

var cancel_itemer = document.querySelector('.modal-cancel-button');
cancel_itemer.addEventListener('click', function () {
   		image_url.value = "";
   		name_input.value = "";
  		location_input.value = "";
  		description_input.value = "";
  console.log("The input was cleared since canceled");
  modal_backdrop.style.display="none";
  create_item_modal.style.display="none";
  console.log("And create-itemer window was closed");
});

function addNewItem(event)
{
   if( name_input.value == "")
   {
   		alert("Name can not be empty! Please input name");
   }
   else if (description_input.value == "")
   {
   		alert("Description can not be empty! Please input description");
   }
   else if (location_input.value =="")
   {
   		alert("Location can not be empty! Please input location");
   }
   else if (image_input.value == "")
   {
   		alert("Image can not be empty! Please input Image URL")
   }
   else	
   {	
		var newItem = document.createElement('article');
		newItem.classList.add('item');
		item_container.appendChild(newItem);

		var newDivImage =  document.createElement('div');
		newDivImage.classList.add('image-container');
		var divImage = document.createElement('img');
		divImage.classList.add(image_input);
		newDivIcon.appendChild(divImage);
		newItem.appendChild(newDivImage);
	
		var newDivContent = document.createElement('div');
		newDivContent.classList.add('item-content');
		
		var newName = document.createElement('p');
		newName.classList.add('item-name');
		newName_text = document.createTextNode(name_input.value);
		newName.appendChild(newName_text);
		newDivContent.appendChild(newName);

	    var newLocation = document.createElement('p');
		newLocation.classList.add('item-location');
		newLocation_text = document.createTextNode(location_input.value);
		newLocation.appendChild(newLocation_text);
		newDivContent.appendChild(newLocation);

	    var newDescription = document.createElement('p');
		newDescription.classList.add('item-description');
		newDescription_text = document.createTextNode(descrption_input.value);
		newDescription.appendChild(newDescription_text);
		newDivContent.appendChild(newDescription);
		
		newItem.appendChild(newDivContent);
   		console.log("The new itemer was submmited");   		
   		image_url.value = "";
   		name_input.value = "";
  		location_input.value = "";
  		description_input.value = "";
   		modal_backdrop.style.display="none";
  		create_item_modal.style.display="none";

 		item = document.querySelectorAll('.item');
 		oldChild=item;
   	} 
}

var accept_itemer = document.querySelector('.modal-accept-button');
accept_itemer.addEventListener('click', addNewItem);
var oldChild=item;

function handleSearch(){
	item=oldChild;
	console.log("Begin to Search");
	console.log("Current item are", item);
	if(search_input.value != "")
	{	
		for (var i =0; i < item.length; i++)
		{

			var currentItemContent = item[i].querySelector('.item-content');
			var currentItemText = currentItemContent.querySelector('.item-text');
			var currentItemAttr = currentItemContent.querySelector('.item-attribution');	

			var search_input_text = search_input.value.toLowerCase();
			var current_item_text = currentItem.textContent.toLowerCase();
			var current_item_attr = currentItemAttr.textContent.toLowerCase();
			
			if( !(current_item_text.includes(search_input_text))&& 
				!(current_item_attr.includes(search_input_text)) )
			{
				item[i].remove();
			}
			else 
			{
			    item_container.appendChild(item[i]);
			}
	    }
	    console.log("Finish Al Search");
	}
	else 
	{
		for (var i =0; i < item.length; i++)
		{
			item[i].remove();
		}
		console.log("Delete All");
		for (var i =0; i < oldChild.length; i++)
		{
			item_container.appendChild(oldChild[i]);
		}
		console.log("Return to orginal web");
	}

}

var search_input = document.getElementById('navbar-search-input');
search_input.addEventListener('input', handleSearch);

var search_button = document.getElementById('navbar-search-button');
search_button.addEventListener('click', handleSearch);
