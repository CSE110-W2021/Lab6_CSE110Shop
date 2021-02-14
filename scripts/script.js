// Script.js

async function asyncProcess() {

	//Init site details
	let currCart = 0
	let itemList = document.getElementById('product-list')
	let cartCount = document.getElementById('cart-count')
	myStorage = window.localStorage

	//Get data if needed
	if(myStorage.getItem('response') == null){
	    let response = await fetch('https://fakestoreapi.com/products')
		let responseJSON = await response.json()
		let jsonString = await JSON.stringify(responseJSON)
	
		myStorage.setItem('response', jsonString)
		
	}

	//Parse data from storage
	let outString = myStorage.getItem('response')
	let myJson = JSON.parse(outString)

	//Build objects
	myJson.forEach(obj => {
		let currItem = new ProductItem(obj)
		if(myStorage.getItem(obj['id'].toString()) == 'in cart')
			currCart++
		itemList.appendChild(currItem)
	});
	
	//Update cart
	cartCount.textContent = currCart
	

}


window.addEventListener('DOMContentLoaded', () => {
	asyncProcess()

});
