'use strict';

// insert total price at top of form
let checkoutForm = document.querySelector('#registerForm');
let sessionPrice = sessionStorage.getItem('totalPrice');
let totalPrice = parseFloat(sessionPrice).toFixed(2);

//create a new paragraph to display the final price of all items at the top of the page
let newPara = document.createElement('h3');
let newContent = document.createTextNode(`Your Total: ${totalPrice}`);
newPara.appendChild(newContent);
newPara.classList.add('finalPrice')
checkoutForm.insertAdjacentElement('beforebegin', newPara);

//form verification
let orderSubmitButton = document.querySelector('#orderSubmit')
orderSubmitButton.addEventListener('click', () => {
    (e) => {
        e.preventDefault();
    }
    //get the values from the form
    let firstName = document.querySelector('#firstName').value
    let lastName = document.querySelector('#lastName').value
    let address = document.querySelector('#address').value
    let city = document.querySelector('#city').value
    let state = document.querySelector('#state').value
    let zipCode = document.querySelector('#zipCode').value
    let phone = document.querySelector('#phone').value
    let creditCard = document.querySelector('#creditCard').value
    let cardExpire = document.querySelector('#cardExpire').value
    let cardSecurity = document.querySelector('#cardSecurity').value

    //check to see if forms are empty
    if(firstName === '' || lastName === '' || address === '' || city === '' || state === '' || zipCode === '' || phone === '' || creditCard === '' || cardExpire === '' || cardSecurity === '') {
        informUser('Please fill in all form fields');  
    //verifies form fields are filled
    } else if(firstName !== '' && lastName !== '' && address !== '' && city !== '' && state !== '' && zipCode !== '' && phone !== '' && creditCard !== '' && cardExpire !== '' && cardSecurity !== '') {
        //regEx to check form fields against
        let wordRegEx = /^[a-z]+$/i;
        let addressRegEx = /[\w\.\-\s\,]+/;
        let stateRegEx = /(?:Ala(?:(?:bam|sk)a)|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Miss(?:(?:issipp|our)i)|Montana|Nebraska|Nevada|New (?:Hampshire|Jersey|Mexico|York)|North (?:(?:Carolin|Dakot)a)|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South (?:(?:Carolin|Dakot)a)|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming|A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])/i;
        let zipRegEx = /[0-9]{5}/;
        let phoneRegEx = /[0-9]{10}/;
        let creditCardRegEx = /[0-9]{13,19}/;
        let cardExpireRegEx = /^(0?[1-9]|1[0-2])\/?(20)?([0-9]{2})$/;
        let cardSecurityRegEx = /[0-9]{3,4}/;

        //If form fields are invalid then inform the user
        if(wordRegEx.test(firstName) !== true || wordRegEx.test(lastName) !== true || addressRegEx.test(address) !== true || wordRegEx.test(city) !== true || stateRegEx.test(state) !== true || zipRegEx.test(zipCode) !== true || phoneRegEx.test(phone) !== true || creditCardRegEx.test(creditCard) !== true || cardExpireRegEx.test(cardExpire) !== true || cardSecurityRegEx.test(cardSecurity) !== true){
            console.log('Not valid fields');
            informUser('Invalid info Please try again');
        //if form fields are all valid, then bring user to thank you page
        } else if (wordRegEx.test(firstName) === true || wordRegEx.test(lastName) === true || addressRegEx.test(address) === true || wordRegEx.test(city) === true || stateRegEx.test(state) === true || zipRegEx.test(zipCode) === true || phoneRegEx.test(phone) === true || creditCardRegEx.test(creditCard) === true || cardExpireRegEx.test(cardExpire) === true || cardSecurityRegEx.test(cardSecurity) === true){
            window.location.href = './thanks.html';
        }
    }
    //function to inform user if there is an issue
    function informUser(sentence) {
        if(document.body.contains(document.querySelector('.inform'))){
            let invalidParagraph = document.querySelector('.inform');
            invalidParagraph.remove();
        }
        let newPara = document.createElement('p');
        let newContent = document.createTextNode(sentence);
        newPara.appendChild(newContent);
        checkoutForm.appendChild(newPara);
        newPara.classList.add("inform");
        }
})
