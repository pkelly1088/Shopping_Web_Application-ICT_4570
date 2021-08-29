'use strict';
//grab logout button
let logoutButton = document.querySelector('#logoutButton');

//when logout button is clicked remove session key and total price of items from session storage and go to home page
logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('sessionKey');
    sessionStorage.removeItem('totalPrice');
    window.location.href = './index.html';
})