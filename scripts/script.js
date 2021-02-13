// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.length == 0) {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => {
        for(var i = 0; i < data.length; i++)
          localStorage.setItem((i+1).toString(), JSON.stringify(data[i]));
        
          var list = document.getElementById("product-list");
          for(var x = 1; x <= 20; x++) {
            var itemToLoad = localStorage.getItem(x.toString());
            var titleIndex = itemToLoad.indexOf("\"title\":");
            var priceIndex = itemToLoad.indexOf("\"price\":");
            var descriptionIndex = itemToLoad.indexOf("\"description\":");
            var imageIndex = itemToLoad.indexOf("\"image\":");

            var strTitle = itemToLoad.substring(titleIndex + 9, priceIndex - 2);
            var strPrice = itemToLoad.substring(priceIndex + 8, descriptionIndex - 1);
            var strImage = itemToLoad.substring(imageIndex + 9, itemToLoad.length - 2);
            var item = new ProductItem(strTitle, strPrice, strImage, x);

            if(localStorage.getItem("cart" + x)) {
              item.setRemoveBtn();
              //increase the number of items in the cart by 1
              var cartNum = document.getElementById("cart-count");
              cartNum.innerHTML = Number(cartNum.innerHTML) + 1;
            }

            list.appendChild(item);
          }
      });
  }
});