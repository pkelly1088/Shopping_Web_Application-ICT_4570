'use strict';

//on load of window check to see if screenname, background color, and button color are saved in local storage
//if they are saved in local storage, then apply them to the page
window.addEventListener('load', () =>{

    if(localStorage.hasOwnProperty('screenName') === true){
        setScreenName();
    }

    if(localStorage.hasOwnProperty('backgroundColor') === true){
        setBackgroundColor();
    }

    if(localStorage.hasOwnProperty('buttonColor') === true){
        setButtonColor();
    }
})

//grabs submit button from dom for use
let submitBtn = document.querySelector('.submit');

//adds event listener on click for submit button
submitBtn.addEventListener('click', (e) =>{

    e.preventDefault();//prevents default action of submit button

    //grabs the value of the background color selected by the user, saves it to local storage, then sets it on the page
    let userBackgroundColor = document.querySelector('#backgroundColor').value;
    localStorage.setItem('backgroundColor', userBackgroundColor);
    setBackgroundColor();//see function below

    //grabs the value of the button color selected by the user, saves it to local storage, then set it on page
    let userBtnColor = document.querySelector('#buttonColors').value;
    localStorage.setItem('buttonColor', userBtnColor);
    setButtonColor();

    //grabs the value of the screenname, checks to make sure it is not empty, if it is not empty then saves the value to local storage
    //then applies the new value to the page
    let newScreenName = document.querySelector('#screenName').value;
    if(newScreenName !== ''){
        localStorage.setItem('screenName', newScreenName);
        setScreenName();
    }
})

//This function takes the value saved from the form for the background color from local storage and then applies it to the page background
//and text on the page depending on the value
function setBackgroundColor () {

    //selects the main section of the page, the titles, and the value saved in local storage for the background
    let mainPage = document.querySelector('main');
    let mainTitle = document.querySelector('h1');
    let secondTitle = document.querySelector('h2');
    let newBackgroundColor = localStorage.getItem('backgroundColor');

        // if user selected default white, sets values for background and text color
    if (newBackgroundColor === 'white')  {
        mainPage.style.backgroundColor = '#F4EDDF';
        mainPage.style.color = '#333333';  
        mainTitle.style.color = '#333333';
        secondTitle.style.color = '#333333';
    }
        // if user selected red, sets values for background and text color
    else if(newBackgroundColor === 'red')  {                       
        mainPage.style.backgroundColor = '#C34462';
        mainPage.style.color = '#F4EDDF';
        mainTitle.style.color = '#F4EDDF';
        secondTitle.style.color = '#F4EDDF';  
    }
        // if user selected green sets values for background and text color
    else if(newBackgroundColor === 'green')  {
        mainPage.style.backgroundColor = '#557C3E';
        mainPage.style.color = '#F4EDDF';
        mainTitle.style.color = '#F4EDDF';
        secondTitle.style.color = '#F4EDDF';    
    }
        // if user selected blue sets values for background and text color
    else if(newBackgroundColor === 'blue')  {
        mainPage.style.backgroundColor = '#008DCD';
        mainPage.style.color = '#F4EDDF';
        mainTitle.style.color = '#F4EDDF';
        secondTitle.style.color = '#F4EDDF';  
    }
}

//This function takes the value saved from the form for the submit button from local storage and then applies it to the button background
//and text depending on the value
function setButtonColor () {

    //grabs value saved from local storage for button color
    let newBtnColor = localStorage.getItem('buttonColor');

        // if user selected default white, sets value for button background and text color
    if (newBtnColor === 'white')  {
        submitBtn.style.backgroundColor = '#F4EDDF';
        submitBtn.style.color = '#333333';    
    }
        // if user selected red, sets value for button background and text color
    else if(newBtnColor === 'red')  {                       
        submitBtn.style.backgroundColor = '#C34462';
        submitBtn.style.color = '#F4EDDF';  
    }
        // if user selected green, sets value for button background and text color
    else if(newBtnColor === 'green')  {
        submitBtn.style.backgroundColor = '#557C3E';
        submitBtn.style.color = '#F4EDDF';  
    }
        // if user selected blue, sets value for button background and text color
    else if(newBtnColor === 'blue')  {
        submitBtn.style.backgroundColor = '#008DCD';
        submitBtn.style.color = '#F4EDDF';
    }
}

//function checks to see if the profile form exists on the page, then checks to see  if screenName title exists on the page, if it does
//exist then it removes it so there aren't duplicates. Then saves the new screenname value to local storage and adds the title to the 
//page at the top of the form
function setScreenName () {

    if(document.body.contains(document.querySelector('#profileForm'))){ //checks to see the profile form is on the page, this is to prevent issues with cart and checkout pages
        
        //if screenname title is on the page remove it so there aren't duplicates
        if(document.body.contains(document.querySelector('.screenName'))){
            let welcomeParagraph = document.querySelector('.screenName');
            welcomeParagraph.remove();
        }
    
        //gets new screen name value from local storage
        let existScreenName = localStorage.getItem('screenName');
    
        //grabs profile form from dom
        let profileForm = document.querySelector('#profileForm');
    
        //creates new h2 element, adds welcome message with users screen name, inserts welcome message in h2 element, adds screenname class to
        //h2 element, then places the element as the first child in the profile form
        let newHeading = document.createElement('h2');
        let newContent = document.createTextNode(`Welcome ${existScreenName}!`);
        newHeading.appendChild(newContent);
        newHeading.classList.add("screenName");
        profileForm.insertBefore(newHeading, profileForm.firstElementChild);
    }
}