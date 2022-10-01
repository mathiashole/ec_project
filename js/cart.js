console.log('this event active');

//Global variables

const CART_USER = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

//Function

function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID


function showCartList() {

    let cartToAppend = "";
    let itemCart = presentCartArray;

    cartToAppend += `
    <div class="col mb-4">
        <div class="d-flex justify-content-center mx-5 mt-4">
            <h1 class="mb-1">Carrito de compras</h1>
        </div>
        <div class="col mt-4">
            <div class="col">
                <h4 class="d-flex w-100 justify-content-between mb-4">Articulos a comprar</h4>
            </div>
        </div>
        <table class="table">
          <thead class="table-dark text-center">
            <tr>
              <th scope="col"></th>
              <th scope="col">Nombre</th>
              <th scope="col">Costo</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody id="contenedor">
        `
        for(let i = 0; i < presentCartArray.articles.length; i++){
            let infoCart = presentCartArray.articles[i];
            
            cartToAppend +=`
            <tr class="text-center">
                <th>
                    <img src="${infoCart.image}" class="w-25 rounded-3">          
                </th>
                <th>
                    <p>${infoCart.name}</p>          
                </th>
                <th>              
                    <p>${infoCart.currency + infoCart.unitCost}</p>          
                </th>
                <th>
                    <p>${infoCart.count}</p>          
                </th>
                <th>
                    <b>${infoCart.currency + (infoCart.count * infoCart.unitCost)}</b>          
                </th>
            </tr>    
            `

        }

        cartToAppend +=`
        </tbody>
        </table>  
    </div>
    `

    document.getElementById("cart-container").innerHTML = cartToAppend;

}


//Event listener

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_USER).then(function (resultObj) {
        if (resultObj.status === "ok") {
            presentCartArray = resultObj.data
            showCartList();
        }
    });

    myFunction();

    allowEntry();


});