"use strict";

//global variables for functions
let genderTwo = ["Men", "Women"];
let sleeveLength = ["ShortSleeveCrewneck", "LongSleeveCrewneck"];

//checking for local storage, then selecting edit button and applying event listener if values are in local storage;
if (localStorage.hasOwnProperty('MenShortSleeveCrewneck')) {
    let editMenShortButton = document.querySelector("#editMenShortSleeveCrewneck");

    editMenShortButton.addEventListener("click", () => {
        editItem(genderTwo[0], sleeveLength[0], editMenShortButton);
      });
}

if (localStorage.hasOwnProperty('WomenShortSleeveCrewneck')) {
    let editWomenShortButton = document.querySelector("#editWomenShortSleeveCrewneck");

    editWomenShortButton.addEventListener("click", () => {
        editItem(genderTwo[1], sleeveLength[0], editWomenShortButton);
      });
}

if (localStorage.hasOwnProperty('MenLongSleeveCrewneck')) {
    let editMenLongButton = document.querySelector("#editMenLongSleeveCrewneck");

    editMenLongButton.addEventListener("click", () => {
        editItem(genderTwo[0], sleeveLength[1], editMenLongButton);
      });
}

if (localStorage.hasOwnProperty('WomenLongSleeveCrewneck')) {
    let editWomenLongButton = document.querySelector("#editWomenLongSleeveCrewneck");

    editWomenLongButton.addEventListener("click", () => {
        editItem(genderTwo[1], sleeveLength[1], editWomenLongButton); 
      });
    
}

//function for edit Button
function editItem(gender, sleeveLength, editButton) {
  let shirtStyle = gender + sleeveLength;
  //if shirt info is saved to local storage then retrieve the info from the page that is currently displayed
  if(localStorage.hasOwnProperty(shirtStyle)){
    let shirtSize = document.querySelector(`#size${shirtStyle}`);
    let shirtColor = document.querySelector(`#color${shirtStyle}`)
    let shirtQty = document.querySelector(`#qty${shirtStyle}`);
    let removeButton = document.querySelector(`#remove${shirtStyle}`);
    let editCell = document.querySelector(`#editCell${shirtStyle}`);
    let removeCell = document.querySelector(`#removeCell${shirtStyle}`);
  
    //creates new save and cancel buttons to make changes to existing order
    let newSaveButton = document.createElement("button");
    let newSaveContent = document.createTextNode("Save");
    let newCancelButton = document.createElement("button");
    let newCancelContent = document.createTextNode("Cancel");
  
    //places save and cancel buttons in existing form in place of existing edit and remove
    newSaveButton.appendChild(newSaveContent);
    newSaveButton.id = `save${shirtStyle}`;
    newSaveButton.classList.add('cartButton');
    newCancelButton.appendChild(newCancelContent);
    newCancelButton.id = `cancel${shirtStyle}`;
    newCancelButton.classList.add('cartButton');
  
    //creates option selection for shirt that is being edited
    let newQty = `<select name="qty" id="qtySelect${shirtStyle}">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
      </select>`;
  
    //hides edit button and remove button and changes shirt quantity to selection field
    editButton.style.display = "none";
    editCell.appendChild(newSaveButton);
    removeButton.style.display = "none";
    removeCell.appendChild(newCancelButton);
    shirtQty.innerHTML = newQty;
  
    //functionality for save button
    newSaveButton.addEventListener("click", () => {
      saveEdit();
    });

    //gets values for shirt that is being edited
    function saveEdit() {
        let shirtSizeValue = shirtSize.innerHTML;
        let shirtColorValue = shirtColor.innerHTML;
        let shirtQtyValue = document.querySelector(`#qtySelect${shirtStyle}`).value;
        let shirtSubValue = shirtQtyValue * 19.95;
    
        //inserts info saved from shirt being edited into object
        let shirtStyleObject = {
            size: shirtSizeValue,
            color: shirtColorValue,
            qty: shirtQtyValue,
            sub: shirtSubValue
          };
        
        //saves over info in local storage
        localStorage.setItem(shirtStyle, JSON.stringify(shirtStyleObject));
        window.location.href = "./cart.html";
      }
    
      //Functionality for cancel button, reload page without saving changes
      newCancelButton.addEventListener("click", () => {
        window.location.href = "./cart.html";
      });
  }
}

//Add remove button function similar to edit button function
if (localStorage.hasOwnProperty('MenShortSleeveCrewneck')) {
    let removeMenShortButton = document.querySelector("#removeMenShortSleeveCrewneck");

    removeMenShortButton.addEventListener("click", () => {
        removeItem(genderTwo[0], sleeveLength[0]);
      });
}

if (localStorage.hasOwnProperty('WomenShortSleeveCrewneck')) {
    let removeWomenShortButton = document.querySelector("#removeWomenShortSleeveCrewneck");

    removeWomenShortButton.addEventListener("click", () => {
        removeItem(genderTwo[1], sleeveLength[0]);
      });
}

if (localStorage.hasOwnProperty('MenLongSleeveCrewneck')) {
    let removeMenLongButton = document.querySelector("#removeMenLongSleeveCrewneck");

    removeMenLongButton.addEventListener("click", () => {
        removeItem(genderTwo[0], sleeveLength[1]);
      });
}

if (localStorage.hasOwnProperty('WomenLongSleeveCrewneck')) {
    let removeWomenLongButton = document.querySelector("#removeWomenLongSleeveCrewneck");

    removeWomenLongButton.addEventListener("click", () => {
        removeItem(genderTwo[1], sleeveLength[1]); 
      });
}

function removeItem (genderThree, sleeveLengthThree) {
    let shirtStyleThree = genderThree + sleeveLengthThree;
    console.log(shirtStyleThree);
    localStorage.removeItem(shirtStyleThree);
    window.location.href = "./cart.html";
}
