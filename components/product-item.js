// product-item.js

class ProductItem extends HTMLElement {
constructor(jsonObject) {
  super()
  
  //Get storage
  myStorage = window.localStorage

  //Get cart count
  let cartCount = document.getElementById('cart-count')
  
  //Init shadow dom
  let wrapper = this.attachShadow({mode: 'open'})
  
  //Init li
  let item = document.createElement('li')
  
  //Create elements of li
  let styleSheet = document.createElement('link')
  let name = document.createElement('p')
  let price = document.createElement('p')
  let image = document.createElement('img')
  let button = document.createElement('button')

  //Add attribute to li
  item.setAttribute('class', 'product')

  //Add style to wrapper
  styleSheet.setAttribute('rel', 'stylesheet')
  styleSheet.setAttribute('href', 'styles/styles.css')
  wrapper.append(styleSheet)

  //Add attributes to elements
  name.setAttribute('class', 'title')
  name.textContent = jsonObject['title']
  price.setAttribute('class', 'price')
  price.textContent = jsonObject['price']
  image.src = jsonObject['image']
  image.alt = jsonObject['title']
  image.setAttribute('width', '200')
  if(myStorage.getItem(jsonObject['id'].toString()) == 'in cart'){
    button.textContent = 'Remove from Cart'
  }
  else{
    button.textContent = 'Add to Cart'
  }

  //Define button behavior
  button.onclick = function() { 
    let currCart = parseInt(cartCount.textContent)
	  if (myStorage.getItem(jsonObject['id'].toString()) == 'in cart') {
			myStorage.setItem(jsonObject['id'].toString(), 'none')
      cartCount.textContent =  currCart - 1
      button.textContent = 'Add to Cart'
		} else {
      myStorage.setItem(jsonObject['id'].toString(), 'in cart')
      cartCount.textContent = currCart + 1
			button.textContent = 'Remove from Cart'
		}
  }

  //Append elements to li
  item.appendChild(image)
  item.appendChild(name)
  item.appendChild(price)
  item.appendChild(button)

  //Append elements to shadow dom
  wrapper.appendChild(item)


  
}

}

customElements.define('product-item', ProductItem);