console.log('this event active');

//Global variables

const CART_USER = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const itemsCart = document.getElementById('itemsCart');
const footer = document.getElementById('footer');
const templateCart = document.getElementById("templateTable").content;
const fragment = document.createDocumentFragment();
const templateTableSecond = document.getElementById("templateTableSecond").content;
const fromToInfoProduct = document.getElementById("fromToInfoProduct");
let cart = {};


//Function

function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID

const setCart = () => {

    let init = presentCartArray.articles[0]

        const product = {
            id  : init.id,
            name : init.name,
            unitCost : init.unitCost,
            currency : init.currency,
            
        }

        if(cart.hasOwnProperty(product.id)){
            product.count = cart[product.id].count + 1
        }

        cart[product.id] = {...product}

        console.log(product.unitCost)
        return(product)

}



const showCart = () => {
   
    itemsCart.innerHTML = ''
    presentCartArray.articles.forEach(product => {
        templateCart.querySelector('img').setAttribute('src', product.image)
        templateCart.querySelectorAll('td')[0].textContent =product.name
        templateCart.querySelectorAll('td')[1].textContent = product.currency + " " + product.unitCost
        templateCart.querySelector('input').setAttribute('value', product.count) 
        // templateCart.querySelector('.btn-success').dataset.id = product.id
        // templateCart.querySelector('.btn-danger').dataset.id = product.id
        templateCart.querySelectorAll('b')[0].textContent =  product.currency
        templateCart.querySelectorAll('b')[1].textContent =  product.count * product.unitCost

        const clone = templateCart.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsCart.appendChild(fragment)

    showFooter()

}

const showFooter = () => {
    footer.innerHTML = ''
    if(presentCartArray.articles.length === 0){
        footer.innerHTML= `
        <th scope="row" colspan="5">Carrito vacio, Agregue sus productos</th>
        `
    }

}

function cat(){
    window.addEventListener("input", function(event) {

    const init = presentCartArray.articles[0]
    const numberObject = document.getElementById("cartCount").value;
    console.log(init.unitCost*numberObject)
    document.getElementById('totalCost') .innerHTML = init.unitCost * numberObject 
        
});}

function getProductInfo(){
    let arrayCartProduct = localStorage.getItem("arrayProductInfo");
    arrayCartProduct = JSON.parse(arrayCartProduct);
    console.log(arrayCartProduct);
    
    console.log(arrayCartProduct.images[0])
    templateTableSecond.querySelector('img').setAttribute('src', arrayCartProduct.images[0])
    templateTableSecond.querySelectorAll('td')[0].textContent =arrayCartProduct.name
    templateTableSecond.querySelectorAll('td')[1].textContent = arrayCartProduct.currency + " " + arrayCartProduct.cost
    templateTableSecond.querySelector('input').setAttribute('value', 1) 
    // templateTableSecond.querySelector('.btn-success').dataset.id = arrayCartProduct.id
    // templateTableSecond.querySelector('.btn-danger').dataset.id = arrayCartProduct.id
    templateTableSecond.querySelectorAll('b')[0].textContent =  arrayCartProduct.currency
    templateTableSecond.querySelectorAll('b')[1].textContent =  1 * arrayCartProduct.cost

    const clone = templateTableSecond.cloneNode(true)
    fragment.appendChild(clone)

    itemsCart.appendChild(fragment)
}



//Event listener

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_USER).then(function (resultObj) {
        if (resultObj.status === "ok") {
            presentCartArray = resultObj.data
            cat();
            showCart();
            getProductInfo();
        }
    });

    myFunction();

    allowEntry();

});

