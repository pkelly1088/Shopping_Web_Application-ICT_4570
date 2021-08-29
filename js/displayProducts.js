"use strict";

//fetch products json data
fetch("./js/products.json")
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((data) => {
    //grabbing page areas where to add shirt options
    let shortSleeve = document.querySelector("#shortSleeveShirtList");
    let longSleeve = document.querySelector("#longSleeveShirtList");

    //variables for main options in data
    let menShort = data.Men[0];
    let menLong = data.Men[1];
    let womenShort = data.Women[0];
    let womenLong = data.Women[1];
    let gender = ["Men", "Women"];

    //call function to add different styles to page
    addShirtOption(menShort, shortSleeve, gender[0]);
    addShirtOption(womenShort, shortSleeve, gender[1]);
    addShirtOption(menLong, longSleeve, gender[0]);
    addShirtOption(womenLong, longSleeve, gender[1]);

    addCartButton();

    //Function to Fill Form
    function addShirtOption(shirtOption, pageLocation, gender) {
      let style = shirtOption.style;
      let shirtId = gender + style.split(' ').join('');
      let sizes = shirtOption.size;
      let colors = shirtOption.colors;
      let sizeOptions = "";
      let colorOptions = "";

      //creates options for sizes saved in data for each item
      for (const element of sizes) {
        sizeOptions += `<option value="${element}">${element}</option>`;
      }

      //creates options for colors saved in data for each item
      for (const el of colors) {
        colorOptions += `<option value="${el}">${el}</option>`;
      }

      //creates form for info passed into function and populates the form with data
      const formShirtOptions = `<form class="formBox" id="${shirtId}">
                    <h3 class="displayTitle">${gender} ${style}</h3>
                    <h4 class="displayPrice"><strong>Price:</strong> $19.95</h4>
                    <section class="sizeSelection">
                        <label for="size">Sizes</label>
                            <select name="size" id="size${shirtId}">
                                <option value=""></option>
                                ${sizeOptions}
                            </select>
                    </section>
                    <section class="colorSelection">
                        <label for="color">Colors</label>
                            <select name="color" id="color${shirtId}">
                                <option value=""></option>
                                ${colorOptions}
                            </select>
                    </section>
                    <section class="qtySelection">
                        <label for="qty">Quantity</label>
                            <select name="qty" id="qty${shirtId}">
                                <option value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                    </section>
                    <section>
                        <button type="button" class="submit" id="add${shirtId}">Add to Cart!</button>
                    </section>
                </form>`;

      //adds each form to the page
      pageLocation.innerHTML += formShirtOptions;
    }

    //creates button to add to go to cart
    function addCartButton () {
        let newButton = document.createElement('button');
        let newContent = document.createTextNode('Go to Cart')
        newButton.appendChild(newContent);
        newButton.classList.add('actionButton');
        longSleeve.appendChild(newButton);
    }
  })
  //catches error if there is an issue loading json data
  .catch((error) => {
    console.log("There was an error: ", error);
  });
