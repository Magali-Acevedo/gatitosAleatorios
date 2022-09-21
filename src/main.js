//UTILIZANDO AXIOS

const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});

api.defaults.headers.common['X-API-KEY'] = 'live_6GYeF62weU1FWzSoTDkCwQMGnMSalpmW9u5asECbWPk1tJ9vWOuhL6mHkVscmwdn';

//URLs Api
const API_RAMDOM =
  "https://api.thecatapi.com/v1/images/search?limit=3";

const API_FAVOURITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_6GYeF62weU1FWzSoTDkCwQMGnMSalpmW9u5asECbWPk1tJ9vWOuhL6mHkVscmwdn";

const API_FAVOURITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_6GYeF62weU1FWzSoTDkCwQMGnMSalpmW9u5asECbWPk1tJ9vWOuhL6mHkVscmwdn`;

const API_UPLOAD = "https://api.thecatapi.com/v1/images/upload?api_key=live_6GYeF62weU1FWzSoTDkCwQMGnMSalpmW9u5asECbWPk1tJ9vWOuhL6mHkVscmwdn";

const error = document.querySelector(".Error");

async function nextImg() {
  const res = await fetch(API_RAMDOM);
  const data = await res.json();

  console.log(data);

  if (res.status !== 200) {
    error.innerText = "Hubo un error " + res.status;
  } else {

    const cards = document.querySelector(".cards");
    cards.innerHTML = "";

    data.forEach((cat) => {
      const cards = document.querySelector(".cards");

      const article = document.createElement("article");
      const img = document.createElement("img");
      const button = document.createElement("button");
      const btnText = document.createTextNode("ADD");

      button.classList.add("btn-like");
      button.appendChild(btnText);
      
      img.src = cat.url;

      img.classList.add("imgCats");

      article.classList.add("card");
      article.appendChild(img);
      article.appendChild(button);

      cards.appendChild(article);

      button.onclick = () => addFavourites(cat.id);
    });

    /*
        const imgCats1 = document.querySelector('.one');
        const imgCats2 = document.querySelector('.two');
        const imgCats3 = document.querySelector('.three');
        const btnOne = document.querySelector('#btnOne');
        const btnTwo = document.querySelector('#btnTwo');
        const btnThree = document.querySelector('#btnThree');
        imgCats1.src = data[0].url;
        imgCats2.src = data[1].url;
        imgCats3.src = data[2].url;

        btnOne.onclick = () => addFavourites(data[0].id);
        btnTwo.onclick = () => addFavourites(data[1].id);
        btnThree.onclick = () => addFavourites(data[2].id);
        */
  }
}

async function addFavourites(id) {
    const { data, status } = await api.post('/favourites', {
        image_id: id,
    });

    /*
  const res = await fetch(API_FAVOURITES,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        "x-api-key": "live_6GYeF62weU1FWzSoTDkCwQMGnMSalpmW9u5asECbWPk1tJ9vWOuhL6mHkVscmwdn",
    },
    body: JSON.stringify({
    image_id: id
    }),
  });
  console.log("res");
  console.log(res);
  const data = await res.json();
  */

  if (status !== 200) {
    error.innerText = "Hubo un error " + status + message;
    console.log("Hubo un error " + status + message);
  } else {
    favouritesCats();
   
    swal({
        title: "AGREGADO",
        text: "Ya se encuentra en la sección de Favoritos",
        icon: "success",
        button: "Genial!",
      });
  }
}
async function deleteFavourites(id) {
  const res = await fetch(API_FAVOURITES_DELETE(id), {
    method: "DELETE",
  });

  const data = await res.json();


  if (res.status !== 200) {
    error.innerText = "Hubo un error " + res.status;
  } else {
    favouritesCats();
    swal({
        title: "ELIMINADO",
        text: "Lo has eliminado de la sección de Favoritos",
        icon: "warning",
        button: "Genial!",
      });
    
  }
}
async function favouritesCats() {
  const res = await fetch(API_FAVOURITES/*, {
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'live_6GYeF62weU1FWzSoTDkCwQMGnMSalpmW9u5asECbWPk1tJ9vWOuhL6mHkVscmwdn',
    },
  }*/);
  const data = await res.json();

  console.log("Favoritos");
  console.log(data);

  if (res.status !== 200) {
    error.innerText = "Hubo un error " + res.status;
  } else {
    const cards = document.querySelector(".cardsFavorites");
    cards.innerHTML = "";

    data.forEach((element) => {
      const cards = document.querySelector(".cardsFavorites");

      const article = document.createElement("article");
      const img = document.createElement("img");
      const button = document.createElement("button");
      const btnText = document.createTextNode("DELETE");

      button.classList.add("btnDeleteLike");
      button.appendChild(btnText);
      button.onclick = () => deleteFavourites(element.id);
      console.log(img);

      img.src = element.image.url;

      img.classList.add("imgCats");

      article.classList.add("card");
      article.appendChild(img);
      article.appendChild(button);

      cards.appendChild(article);
    });
  }
}

async function UploadCatPhoto() {
    const form = document.getElementById('fileLoadingForm');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(API_UPLOAD,{
        method: 'POST',
        headers: {

        },
        body: formData
    });

    console.log(res.status)
    if (res.status!==201){
        swal({
            title: "Upps!",
            text: "Tenemos problemas al cargar la imagen",
            icon: "warning",
            button: "Ok",
          });
    } else {
        swal({
            title: "AGREGADO",
            text: "Has cargado la imagen de tu gatito a la base de datos",
            icon: "success",
            button: "Genial!",
          });
    }


}

favouritesCats();
nextImg();
