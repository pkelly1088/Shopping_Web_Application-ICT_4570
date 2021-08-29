'use strict';

//grab submit button and login form from dom for use
let submitBtn = document.querySelector('.submit');
let loginForm = document.querySelector('#loginForm');

//add event listener on click to submit button
submitBtn.addEventListener("click", (e) =>{

    e.preventDefault();//prevent default action of submit button

    //grab values for username and password from form
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    //if username or password are empty, then run function that lets user know to fill in all fields
    if (username === '' || password === '') {
        
        emptyFields();//see function below

    //if username and password do not exist in local storage then let the user know they need to enter valid credentials
    } else if(localStorage.hasOwnProperty('username') !== true || localStorage.hasOwnProperty('password') !== true){

        invalidUserPassword();

    //if username and password are in local storage, then validate
    } else if (localStorage.hasOwnProperty('username') === true && localStorage.hasOwnProperty('password') === true){

        //get username and password saved in local storage
        let existUsername = localStorage.getItem('username');
        let existPassword = localStorage.getItem('password');

        //if username or password doesn't match what was entered in registration and saved in local storage, then don't validate
        //and let users know that values are not valid
        //this is not the correct way to do this, but is the best I could do without serve side validation
        if(existUsername !== username || existPassword !== password){

            invalidUserPassword();

        //makes sure username and password match
        }else if(existUsername === username && existPassword === password){

            //remove invalid paragraph if it exists
            if(document.body.contains(document.querySelector('.invalid'))){
                let invalidParagraph = document.querySelector('.invalid');
                invalidParagraph.remove();
            }
    
            loginForm.reset();//resets login form
    
            //creates session key by using date and random 9 digits of numbers and letters combined together
            let date = new Date().toString();
            let num = Math.random().toString(36).substr(2, 9);
            let key = num + '_' + date;
    
            //saves session key to session storage
            sessionStorage.setItem('sessionKey', key);
    
            //redirects to profile page if validated
            window.location.href = './profile.html';
        }
    }

    //if invalid paragraph exists, remove it, then add a new paragraph informing user to enter valid information
    function invalidUserPassword () {

        if(document.body.contains(document.querySelector('.invalid'))){
            let invalidParagraph = document.querySelector('.invalid');
            invalidParagraph.remove();
        }

        let newPara = document.createElement('p');
        let newContent = document.createTextNode('Please enter a valid username and password');
        newPara.appendChild(newContent);
        loginForm.appendChild(newPara);
        newPara.classList.add("invalid");
    }

    //if invalid paragraph exists, remove it, then add a new paragraph informing user to fill all fields
    function emptyFields () {

        if(document.body.contains(document.querySelector('.invalid'))){
            let invalidParagraph = document.querySelector('.invalid');
            invalidParagraph.remove();
        }

        let newPara = document.createElement('p');
        let newContent = document.createTextNode('Please fill in all form fields');
        newPara.appendChild(newContent);
        loginForm.appendChild(newPara);
        newPara.classList.add("invalid");

    }

})