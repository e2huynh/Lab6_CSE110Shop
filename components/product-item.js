// product-item.js

class ProductItem extends HTMLElement {
  #title;
  #price;
  #image;
  #id;
  #shadow;
  constructor(titleStr, priceStr, imageStr, idNum) {
    super();

    this.#title = titleStr;
    this.#price = priceStr;
    this.#image = imageStr;
    this.#id = idNum;

    var shadowRoot = this.attachShadow({mode: 'open'});
    this.#shadow = shadowRoot;

    shadowRoot.innerHTML = `
      <li class="product">
        <link rel="stylesheet" href="./styles/styles.css">
        <img src="` + imageStr + `" alt="` + titleStr + `" width=200 height=286>
        <p class="title">` + titleStr + `</p>
        <p class="price">` + priceStr + `</p>
        <button onclick="alert('Added to Cart!')">Add to Cart</button>
      </li>
    `;

    this.addEventListener("click", function() {
      if(shadowRoot.innerHTML.indexOf("Add to Cart") != -1) {
        //change to remove cart button
        shadowRoot.innerHTML = `
          <li class="product">
            <link rel="stylesheet" href="./styles/styles.css">
            <img src="` + imageStr + `" alt="` + titleStr + `" width=200 height=286>
            <p class="title">` + titleStr + `</p>
            <p class="price">` + priceStr + `</p>
            <button onclick="alert('Removed from Cart!')">Remove from Cart</button>
          </li>
        `;

        //increase the number of items in the cart by 1
        var cartNum = document.getElementById("cart-count");
        cartNum.innerHTML = Number(cartNum.innerHTML) + 1;

        //add item to local storage
        localStorage.setItem("cart" + idNum, idNum);
      }
      else {
        //change to add cart button
        shadowRoot.innerHTML = `
          <li class="product">
            <link rel="stylesheet" href="./styles/styles.css">
            <img src="` + imageStr + `" alt="` + titleStr + `" width=200 height=286>
            <p class="title">` + titleStr + `</p>
            <p class="price">` + priceStr + `</p>
            <button onclick="alert('Added to Cart!')">Add to Cart</button>
          </li>
        `;

        //decrease the number of items in the cart by 1
        var cartNum = document.getElementById("cart-count");
        cartNum.innerHTML = Number(cartNum.innerHTML) - 1;

        //remove item from local storage
        localStorage.removeItem("cart" + idNum);
      }
    });
  }

  setRemoveBtn() {
    //change to remove cart button
    this.#shadow.innerHTML = `
      <li class="product">
        <link rel="stylesheet" href="./styles/styles.css">
        <img src="` + this.#image + `" alt="` + this.#title + `" width=200 height=286>
        <p class="title">` + this.#title + `</p>
        <p class="price">` + this.#price + `</p>
        <button onclick="alert('Removed from Cart!')">Remove from Cart</button>
      </li>
    `;
  }
  
  //this function is not used but might be useful in future lab?
  setAddBtn() {
    //change to add cart button
    shadow.innerHTML = `
      <li class="product">
        <link rel="stylesheet" href="./styles/styles.css">
        <img src="` + this.#image + `" alt="` + this.#title + `" width=200 height=286>
        <p class="title">` + this.#title + `</p>
        <p class="price">` + this.#price + `</p>
        <button onclick="alert('Added to Cart!')">Add to Cart</button>
      </li>
    `;
  }
}

customElements.define('product-item', ProductItem);