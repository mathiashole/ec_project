console.log('this event active');

//Global variables

const CART_USER = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const itemsCart = document.getElementById('itemsCart');
const footer = document.getElementById('footer');
const templateCart = document.getElementById("templateTable").content;
const fragment = document.createDocumentFragment();
const templateTableSecond = document.getElementById("templateTableSecond").content;
const fromToInfoProduct = document.getElementById("fromToInfoProduct");
const streethome = document.getElementById('street-home');
const numberhome = document.getElementById('number-home');
const sqrhome = document.getElementById('sqr-home');
const validationstreet = document.getElementById('validation-street');
const validationnumber = document.getElementById('validation-number');
const validationsqr = document.getElementById('validation-sqr');
const creditcart = document.getElementById('credit-cart');
const wiretransfer = document.getElementById('wire-transfer');
const validationpay = document.getElementById('validation-pay');
const map = [];
let number = {};


//Function

function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID


const showCart = () => {
   
    itemsCart.innerHTML = ''
    presentCartArray.articles.forEach(product => {
        
        templateCart.querySelector('input').setAttribute('id', product.id)
        templateCart.querySelector('img').setAttribute('src', product.image)
        templateCart.querySelectorAll('td')[0].textContent =product.name
        templateCart.querySelectorAll('td')[1].dataset.id = product.id
        templateCart.querySelectorAll('td')[1].textContent = product.currency + " " + product.unitCost
        templateCart.querySelector('input').dataset.id = product.id
        templateCart.querySelector('input').setAttribute('value', product.count) 
        // templateCart.querySelector('.btn-success').dataset.id = product.id
        // templateCart.querySelector('.btn-danger').dataset.id = product.id
        templateCart.querySelectorAll('b')[0].textContent =  product.currency
        templateCart.querySelectorAll('b')[1].dataset.id = product.id
        templateCart.querySelectorAll('b')[1].textContent =  1 * product.unitCost

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

function catTwo(){

    const kep = map[0].cost;
    const numberO = document.querySelectorAll('input')[1].value
    console.log(numberO)
    console.log(kep*numberO)
    document.getElementById("totalCostTwo").innerHTML = kep*numberO
        
}


function cat(){

    const init = presentCartArray.articles[0]
    const numberObject = document.querySelectorAll('input')[0].value;
    console.log(init.unitCost*numberObject)
    document.getElementById("totalCost").innerHTML = init.unitCost * numberObject 
        
}

function getProductInfo(){
    
    let arrayCartProduct = localStorage.getItem("arrayProductInfo");
    
    if(arrayCartProduct == null){
        localStorage.setItem('arrayProductInfo', '[]')
    }

    arrayCartProduct = JSON.parse(arrayCartProduct);
    map.push(arrayCartProduct);
    
    
    if(map != null){
    console.log(map)
    map.forEach(comeMap => {
        console.log(comeMap)
    templateTableSecond.querySelector('input').setAttribute('id', comeMap.id)
    templateTableSecond.querySelector('img').setAttribute('src', comeMap.images[0])
    templateTableSecond.querySelectorAll('td')[0].textContent =comeMap.name
    templateTableSecond.querySelectorAll('td')[1].textContent = comeMap.currency + " " + comeMap.cost
    templateTableSecond.querySelector('input').setAttribute('value', 1) 
    // templateTableSecond.querySelector('.btn-success').dataset.id = comeMap.id
    // templateTableSecond.querySelector('.btn-danger').dataset.id = comeMap.id
    templateTableSecond.querySelectorAll('b')[0].textContent =  comeMap.currency
    templateTableSecond.querySelectorAll('b')[1].dataset.id = comeMap.id
    templateTableSecond.querySelectorAll('b')[1].textContent =  1 * comeMap.cost

    const clone = templateTableSecond.cloneNode(true)
    fragment.appendChild(clone)

    itemsCart.appendChild(fragment)
    })}
}

function carValidation(){

    let checkTotal = false;
    
    streethome.value != '' ? (validationstreet.className = 'valid-feedback') && (validationstreet.textContent = "Esta correcto") && (streethome.className = 'form-control is-valid') : (validationstreet.className = 'invalid-feedback') && (validationstreet.textContent = "Ingresa una calle") && (streethome.className = 'form-control is-invalid') && (checkTotal = true);
    numberhome.value != '' ? (validationnumber.className = 'valid-feedback') && (validationnumber.textContent = "Esta correcto") && (numberhome.className = 'form-control is-valid') : (validationnumber.className = 'invalid-feedback') && (validationnumber.textContent = "Ingresa un numero") && (numberhome.className = 'form-control is-invalid') && (checkTotal = true);
    streethome.value != '' ? (validationsqr.className = 'valid-feedback') && (validationsqr.textContent = "Esta correcto") && (sqrhome.className = 'form-control is-valid') : (validationsqr.className = 'invalid-feedback') && (validationsqr.textContent = "Ingresa una esquina") && (sqrhome.className = 'form-control is-invalid') && (checkTotal = true);
    creditcart.checked || wiretransfer.checked ? (validationpay.className = 'text-success') && (validationpay.textContent = "Forma de pago seleccionada correctamente") : (validationpay.className = 'text-danger') && (validationpay.textContent = "Debe seleccionar forma de pago") && (checkTotal = true);
    checkTotal ? alert("Hay campos obligatorios vacios") :  console.log()

}

//Event listener

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_USER).then(function (resultObj) {
        if (resultObj.status === "ok") {
            presentCartArray = resultObj.data
            // cat();
            showCart();
            getProductInfo();
        }
    });

    myFunction();

    allowEntry();

    // cat();
});
