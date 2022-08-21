console.log('this event active');

let listExample = document.getElementById('listProduct')

function walkArray(dataArray) {
    // For iterates over the elements of the array (dataArray == json.products)
    for (const i of dataArray) {
        // my variable i iterates and prints the elements of the array
        listExample.innerHTML += ` 
        <div onclick="setCatID(${i.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${i.image}" alt="${i.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${i.name}</h4>
                        <small class="text-muted">${i.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${i.description}</p>
                </div>
            </div>
        </div>
        `
        //`<img src="${i.image}" ><p> Precio: ${i.currency + i.cost} <br> ${i.name} <br> Descripcion: ${i.description} <br> Vendidos: ${i.soldCount} </p><br>`; // Se concatena cada párrafo de la manera que queremos mostrarlo al innerHTML del contenedor
    }
}


fetch('https://japceibal.github.io/emercado-api/cats_products/101.json').then( // fetch mekes us a promise, that brings information
    function (response) {
        return response.json(); //.then makes us a promise, that tranforms into json format
    })
    .then(function (json) {
        walkArray(json.products); //retunr information of API (array in this case)
})


function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID

document.addEventListener("DOMContentLoaded", myFunction()) //We apply function when the page loads