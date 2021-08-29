"use strict";
//when page has loaded, so forms can load after json data being retrieved
window.addEventListener("load", function () {
  //grab buttons for items being added to cart
  let menShortCrew = document.querySelector("#addMenShortSleeveCrewneck");
  let womenShortCrew = document.querySelector("#addWomenShortSleeveCrewneck");
  let menLongCrew = document.querySelector("#addMenLongSleeveCrewneck");
  let womenLongCrew = document.querySelector("#addWomenLongSleeveCrewneck");
  let cartButton = document.querySelector(".actionButton");

  //global variables to put into functions
  let genderTwo = ["Men", "Women"];
  let sleeveLength = ["ShortSleeveCrewneck", "LongSleeveCrewneck"];

  //event listeners for all add to cart buttons
  menShortCrew.addEventListener("click", () => {
    saveToSession(genderTwo[0], sleeveLength[0]);
  });

  womenShortCrew.addEventListener("click", () => {
    saveToSession(genderTwo[1], sleeveLength[0]);
  });

  menLongCrew.addEventListener("click", () => {
    saveToSession(genderTwo[0], sleeveLength[1]);
  });

  womenLongCrew.addEventListener("click", () => {
    saveToSession(genderTwo[1], sleeveLength[1]);
  });

  //when user clicks go to cart button it redirect them to that page
  cartButton.addEventListener("click", () => {
    (e) => {
      e.preventDefault;
    };

    //if user isn't logged in when they click button then inform user to log in
    if (sessionStorage.hasOwnProperty('sessionKey') === false) {
      if (document.body.contains(document.querySelector(".pleaseLogin"))) {
        let pleaseLoginParagraph = document.querySelector(".pleaseLogin");
        pleaseLoginParagraph.remove();
      }

      let newPara = document.createElement("p");
      let newContent = document.createTextNode("Please Login to Add Items to your Cart");
      newPara.appendChild(newContent);
      cartButton.insertAdjacentElement('afterend' ,newPara);
      newPara.classList.add("pleaseLogin");

    //if user is logged in then redirect to the cart
    } else if (sessionStorage.hasOwnProperty('sessionKey') === true) {
      window.location.href = "./cart.html";
    }
  });

  //function to save info from form for each product to local storage
  function saveToSession(gender, shirtLength) {
    (e) => {
      e.preventDefault();
    };

    //selects values from form
    let shirtStyle = gender + shirtLength;
    let shirtSize = document.querySelector(`#size${shirtStyle}`).value;
    let shirtColor = document.querySelector(`#color${shirtStyle}`).value;
    let shirtQty = document.querySelector(`#qty${shirtStyle}`).value;
    let shirtSubTotal = shirtQty * 19.95;
    let shirtForm = document.querySelector(`#${shirtStyle}`);

    //checks if user is logged in
    if (sessionStorage.hasOwnProperty("sessionKey") === true) {
      //if user is logged in and didn't fill all fields then tell them to fill fields
      if (shirtSize === "" || shirtColor === "" || shirtQty === "") {
        informUser("Please fill in all form fields");
        //if all fields are filled in then save to object, turn to string, then save to local storage
      } else if (shirtSize !== "" && shirtColor !== "" && shirtQty !== "") {
        let shirtStyleObject = {
          size: shirtSize,
          color: shirtColor,
          qty: shirtQty,
          sub: shirtSubTotal
        };
        localStorage.setItem(shirtStyle, JSON.stringify(shirtStyleObject));

        //clears form
        shirtForm.reset();

        //let user know that they successfully added item to the cart
        informUser("Item Added to your Cart!");
      }
      //if user isn't logged in then let user know they need to log in to place order
    } else if (sessionStorage.hasOwnProperty('sessionKey') !== true) {
      informUser("Please Login to Place Order");
    }

    //function inform user based on text passed in
    function informUser(paraText) {
      if (document.body.contains(document.querySelector(".inform"))) {
        let invalidParagraph = document.querySelector(".inform");
        invalidParagraph.remove();
      }

      let newPara = document.createElement("p");
      let newContent = document.createTextNode(paraText);
      newPara.appendChild(newContent);
      shirtForm.appendChild(newPara);
      newPara.classList.add("inform");
    }
  }
});
