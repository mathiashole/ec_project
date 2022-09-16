console.log('this event active');

//Global variables

let listExample = document.getElementById('listProduct')
const INF_PRODUCT = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE
const COMM_PRODUCT = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE
let commentsProductArray = [];

// document.getElementsByClassName('fa fa-star')[1].classList.add('checked')  DEBO USAR ESTO

// console.log(ratingStars)


//Function

function myFunction() {
    const elementClean = document.getElementById('alertClean')
    elementClean.remove()
} //this function remove tag <div>, its necessary select one ID


// function setProductID(id) {
//     localStorage.setItem("catID", id);
//     window.location = "product-info.html"
// }


function showProductsList() {

    let htmlContentToAppend = "";
    let itemProduct = presentProductArray;

    htmlContentToAppend += `
    <div class="col">
        <div class="d-flex justify-content-between mx-5 mt-4">
            <h1 class="mb-1">${itemProduct.name}</h1>
        </div>
            <hr class="my-4">
        <div class="col mt-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Precio:</h4>
                </div>
                <p class="mb-1">${itemProduct.currency} ${itemProduct.cost}</p>
            </div>
        <div class="col mt-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Descripcion:</h4>
                </div>
            <p class="mb-1">${itemProduct.description}</p>
        </div>
        <div class="col mt-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Categoria:</h4>
                </div>
            <p class="mb-1">${itemProduct.category}</p>
        </div>
        <div class="col mt-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Cantidad de vendidos:</h4>
                </div>
            <p class="mb-1">${itemProduct.soldCount}</p>
        </div>    
    </div>
    <div class="col mt-4">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="">Imagenes ilustrativas:</h4>
        </div>
        <div id="carouselExampleInterval" class="carousel slide w-60 p-3 mx-auto" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="10000">
            <img src="${itemProduct.images[0]}" class="d-block w-100 rounded" alt="First slide">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="${itemProduct.images[1]}" class="d-block w-100 rounded" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img src="${itemProduct.images[2]}" class="d-block w-100 rounded" alt="Third slide">
          </div>
          <div class="carousel-item">
              <img src="${itemProduct.images[3]}" class="d-block w-100 rounded" alt="Fourth slide">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
        <div class="col mt-4 mb-4">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="">Comentarios:</h4>
                </div>
        </div>    
    </div>
    `

    document.getElementById("info-product-container").innerHTML = htmlContentToAppend;

}


function showCommentsList() {

    let htmlCommentsToAppend = "";
    for (let i = 0; i < commentsProductArray.length; i++) {
        let comment = commentsProductArray[i];

        htmlCommentsToAppend += `  
            <div class="list-group-item">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${comment.user} </h4>
                            <p class="text-muted">- ${comment.dateTime}</p>
                            <div class="col mx-4" id="${comment.dateTime}">
                            </div>
                        </div>
                        <p class="text-muted mb-1">${comment.description}</p>
                    </div>
                </div>
            </div>
            `

        document.getElementById("comments-container").innerHTML = htmlCommentsToAppend;

    }

    qualify(commentsProductArray);
}

// let counter;

function qualify(data) {
    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        makeQualifyElement(element.score, element.dateTime)

    }
};

function makeQualifyElement(numberScore, oClock) {
    let division = document.createElement('div');

    for (let i = 0; i < 5; i++) {

        let span = document.createElement('span');
        span.className = (i < numberScore ? 'fa fa-star checked' : 'fa fa-star');
        division.appendChild(span);

        // document.getElementById(oClock).appendChild(division)
    }

    document.getElementById(oClock).appendChild(division)
    console.log(division)


}

//Event listener

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(INF_PRODUCT).then(function (resultObj) {
        if (resultObj.status === "ok") {
            presentProductArray = resultObj.data
            showProductsList()
        }
    });

    getJSONData(COMM_PRODUCT).then(function (resultComments) {
        if (resultComments.status === "ok") {
            commentsProductArray = resultComments.data
            console.log(commentsProductArray);
            showCommentsList()

        }
    });


    myFunction();

    allowEntry();

    showProductsList();



});

