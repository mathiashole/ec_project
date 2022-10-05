console.log('this event active');

//Global variables

const CART_USER = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const itemsCart = document.getElementById('itemsCart');
const footer = document.getElementById('footer');
const templateCart = document.getElementById("templateTable").content;
const fragment = document.createDocumentFragment();
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

        console.log(product)

}

const showCart = () => {

    cat();   
    itemsCart.innerHTML = ''
    presentCartArray.articles.forEach(product => {
        templateCart.querySelector('img').setAttribute('src', product.image)
        templateCart.querySelectorAll('td')[0].textContent =product.name
        templateCart.querySelectorAll('td')[1].textContent = product.currency + " " + product.unitCost
        // templateCart.querySelector('input').setAttribute('value', product.count) 
        templateCart.querySelector('.btn-success').dataset.id = product.id
        templateCart.querySelector('.btn-danger').dataset.id = product.id
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

// function showCartList() {
    
//     let cartToAppend = "";
//     let itemCart = presentCartArray;

//     cartToAppend += `
//     <div class="col mb-4">
//         <div class="d-flex justify-content-center mx-5 mt-4">
//             <h1 class="mb-1">Carrito de compras</h1>
//         </div>
//         <div class="col mt-4">
//             <div class="col">
//                 <h4 class="d-flex w-100 justify-content-between mb-4">Articulos a comprar</h4>
//             </div>
//         </div>
//         <table class="table">
//           <thead class="table-dark text-center">
//             <tr>
//               <th scope="col"></th>
//               <th scope="col">Nombre</th>
//               <th scope="col">Costo</th>
//               <th scope="col">Cantidad</th>
//               <th scope="col">Subtotal</th>
//             </tr>
//           </thead>
//           <tbody id="contenedor">
//         `
//         for(let i = 0; i < presentCartArray.articles.length; i++){
//             let infoCart = presentCartArray.articles[i];
            
//             cartToAppend +=`
//             <tr class="text-center">
//                 <th>
//                     <button type="button" class="btn"><img src="${infoCart.image}" class="rounded-3" width="90" height="60"></button>          
//                 </th>
//                 <th>
//                     <p>${infoCart.name}</p>          
//                 </th>
//                 <th>              
//                     <p>${infoCart.currency + " " + infoCart.unitCost}</p>          
//                 </th>
//                 <th class="col-1">
//                 <input type="number" name="cartCostInput" class="form-control" id="cartCount" value=${infoCart.count} min="1">          
//                 </th>
//                 <th>
//                     <b id="kek">${infoCart.currency + " " + infoCart.unitCost}</b>          
//                 </th>
//             </tr>    
//             `

//         }

//         cartToAppend +=`
//         </tbody>
//         </table>  
//     </div>
//     `

//     document.getElementById("cart-container").innerHTML = cartToAppend;

// }



//Event listener

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_USER).then(function (resultObj) {
        if (resultObj.status === "ok") {
            presentCartArray = resultObj.data
            setCart();
            showCart();
        }
    });

    myFunction();

    allowEntry();

});


function cat(){
    window.addEventListener("input", function(event) {
   
    const numberObject = document.getElementById("cartCount");
    console.log(numberObject.value)
    return(parseInt(numberObject.value))    
        
});}

// function showNumber(){
//     document.getElementById("cartCount").value;
//     console.log(document.getElementById("cartCount").value)
// }
