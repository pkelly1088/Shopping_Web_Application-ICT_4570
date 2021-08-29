'use strict';

//grabbing submit button and registration form from DOM for use
let submitBtn = document.querySelector('.submit');
let regForm = document.querySelector('#registerForm');

//applying event listener to submit button
submitBtn.addEventListener("click", (e) =>{

    e.preventDefault();//prevents default action
    
    //grabs values from form
    let screenName = document.querySelector('#screenName').value;
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    if (screenName === '' || username === '' || password === '') { //checks to see if any of the fields in the form are empty
        
        removeInvalidPara(); //removes paragraph telling user to fill in all fields if it exists, see function below

        //creates new paragraph, adds content, inserts paragraph at end of registration form, and adds invalid class for styling
        let newPara = document.createElement('p');
        let newContent = document.createTextNode('Please fill in all form fields');
        newPara.appendChild(newContent);
        regForm.appendChild(newPara);
        newPara.classList.add("invalid");

    } else {
        //if all fields are filled, then save fields value to local storage
        localStorage.setItem('screenName', screenName);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        //remove paragraph if it exists
        removeInvalidPara();

        //clear values in registration form
        regForm.reset();

        //creating session key by getting the date and a random string, convert to numbers and letters, then remove 9 figures and combine with date
        //to create the session key and then save it to teh sessionStorage
        let date = new Date().toString();
        let num = Math.random().toString(36).substr(2, 9);
        let key = num + '_' + date;

        sessionStorage.setItem('sessionKey', key);

        //redirect page to profile page after completing registration
        window.location.href = './profile.html';
    }

    //function that removed the invalid paragraph from the page if it already exists, so there aren't duplicates
    function removeInvalidPara () {
        if(document.body.contains(document.querySelector('.invalid'))){
            let invalidParagraph = document.querySelector('.invalid');
            invalidParagraph.remove();
        }
    }

})