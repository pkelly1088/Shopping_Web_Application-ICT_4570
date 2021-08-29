'use strict';
//grabs cart div
let displayCartSection = document.querySelector('#displayCart');

//array of different keys saved in local storage for 
let savedItems = ['MenShortSleeveCrewneck', 'WomenShortSleeveCrewneck', 'MenLongSleeveCrewneck', 'WomenLongSleeveCrewneck'];

let totalPrice = 0;

//if user isn't logged in, then tell them to log in
if(sessionStorage.hasOwnProperty('sessionKey') === false) {
    if (document.body.contains(document.querySelector(".pleaseLogin"))) {
        let pleaseLoginParagraph = document.querySelector(".pleaseLogin");
        pleaseLoginParagraph.remove();
      }

      let newPara = document.createElement("p");
      let newContent = document.createTextNode('Please Login to Add Items to your Cart');
      newPara.appendChild(newContent);
      cartButton.appendChild(newPara);
      newPara.classList.add("pleaseLogin");
//if user is logged in, then create table of products in cart
} else if(sessionStorage.hasOwnProperty('sessionKey') === true){
    //table head
    let tableHead = 
    `<tr>
        <th class="cellOne">Item</th>
        <th>Size</th>
        <th>Color</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Edit</th>
        <th>Remove</th>
    </tr>`;

    //creates table and attaches table head
    let newTable = document.createElement('table');
    newTable.innerHTML += tableHead;
    displayCartSection.appendChild(newTable);

    //for each key in array, then retrieve local storage and then save to variables
    savedItems.forEach((element) => {
        if(localStorage.hasOwnProperty(element)) {
        let savedOrder = JSON.parse(localStorage.getItem(element));
        let shirtSize = savedOrder.size;
        let shirtColor = savedOrder.color;
        let shirtQty = savedOrder.qty;
        let itemName = element.replace(/([A-Z])/g, ' $1').trim();
        let subTotal = parseFloat(savedOrder.sub);
        
        //add prices together
        totalPrice += subTotal;

        //fill in a table row with info saved in local storage
        let itemTable = 
        `<tr id="${itemName}">
            <td class="cellOne">${itemName}</td>
            <td id="size${element}">${shirtSize}</td>
            <td id="color${element}">${shirtColor}</td>
            <td id="qty${element}">${shirtQty}</td>
            <td id="sub${element}">$${subTotal.toFixed(2)}</td>
            <td id="editCell${element}"><button class="cartButton" id="edit${element}">Edit</button></td>
            <td id="removeCell${element}"><button class="cartButton" id="remove${element}">Remove</button></td>
        </tr>`;

        //add each row to table
        newTable.innerHTML += itemTable;
        }
    })

    //last row to display total price
    let lastTableRow = 
        `<tr>
            <td class="cellOne"><strong>Total</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>$${totalPrice.toFixed(2)}</strong></td>
            <td></td>
            <td></td>
        </tr>`;
        newTable.innerHTML += lastTableRow

        sessionStorage.setItem('totalPrice', totalPrice);
    
        //add button at bottom of page to checkout
        let newButton = document.createElement('button');
        let newContent = document.createTextNode('Check Out')
        newButton.appendChild(newContent);
        newButton.classList.add('actionButton');
        newButton.id = 'checkOut';
        displayCartSection.appendChild(newButton);

        //send user to checkout page
        let checkOutButton = document.querySelector('#checkOut');
        checkOutButton.addEventListener('click', () => {
            window.location.href = "./checkout.html";
        })
}