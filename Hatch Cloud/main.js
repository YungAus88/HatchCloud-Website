let carts = document.querySelectorAll('.add-cart');

let products = [
	{
		name: 'Yellow Tshirt',
		tag: 'yellowtshirt',
		price: 15,
		inCart: 0
	},
	{
		name: 'Blue Sweater',
		tag: 'bluesweater',
		price: 30,
		inCart: 0
	},
	{
		name: 'Flannel Shirt',
		tag: 'flannelshirt',
		price: 25,
		inCart: 0
	},
	{
		name: 'Hoodie',
		tag: 'hoodie',
		price: 20,
		inCart: 0
	},
	{
		name: 'Sport Bra',
		tag: 'sportbra',
		price: 15,
		inCart: 0
	},
	{
		name: 'Yellow Jacket',
		tag: 'yellowjacket',
		price: 40,
		inCart: 0
	},
	{
		name: 'Grey Blazer',
		tag: 'greyblazer',
		price: 25,
		inCart: 0
	},
	{
		name: 'Red Blazer',
		tag: 'redblazer',
		price: 25,
		inCart: 0
	}
]

for(let i=0; i< carts.length; i++)
{
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalcost(products[i])
	})
}

function onLoadCartNumbers(){
	let productsNumbers = localStorage.getItem('cartNumbers');

	if(productsNumbers)
	{
		document.querySelector('.nav-link span').textContent = productsNumbers + 1;
	}
}

function cartNumbers(products) {
	console.log("product is", products)
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);

	if(productNumbers)
	{
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.nav-link span').textContent = productNumbers + 1;
	}
	else{
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.nav-link span').textContent =1;
	}
	setItems(products);
}

function setItems(products) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);

	if(cartItems != null){
		if(cartItems[products.tag] == undefined){
			cartItems = {
			...cartItems,
			[products.tag]: products
			}
		}
			cartItems[products.tag].inCart += 1;
	}
	else{
		products.inCart = 1;
		cartItems = {[products.tag]: products
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalcost(products) {
	let cartCost = localStorage.getItem('totalcost');
	console.log("The product price is", cartCost)
	console.log(typeof cartCost);
	
	if(cartCost != null)
	{
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalcost", cartCost + products.price);
	}
	else
	{
		localStorage.setItem("totalcost", products.price)
	}

}

function displayCart()
{
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productsContainer = document.querySelector(".container-products");

	console.log(cartItems);
	if(cartItems && productsContainer){
		productsContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productsContainer.innerHTML +=`
			<div class="products">
				<ion-icon name="close-circle">/ion-icon>
				<img src="./images/${item.container-product}.jpg" width="50px">
				<span> ${item.name}</span>
			`
		});
	}
}

onLoadCartNumbers();
displayCart();


