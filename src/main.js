//URLs Api
const API_RAMDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_6GYeF62weU1FWzSoTDkCwQMGnMSalpmW9u5asECbWPk1tJ9vWOuhL6mHkVscmwdn';

const API_FAVOURITES ='https://api.thecatapi.com/v1/favourites?api_key=live_6GYeF62weU1FWzSoTDkCwQMGnMSalpmW9u5asECbWPk1tJ9vWOuhL6mHkVscmwdn';

const error = document.querySelector('.Error');

async function nextImg() {
    const res = await fetch(API_RAMDOM);
    const data = await res.json();

    console.log(data);

    if(res.status !==200){
        error.innerText ="Hubo un error " + res.status;
    } else {
        const imgCats1 = document.querySelector('#imgCats1');
        const imgCats2 = document.querySelector('#imgCats2');
        const imgCats3 = document.querySelector('#imgCats3');
    
        console.log(imgCats2);
    
        imgCats1.src = data[0].url;
        imgCats2.src = data[1].url;
        imgCats3.src = data[2].url;
    }

}

async function addFavourites() {
    const res =await fetch(API_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            image_id:'hi'
        }),
    });

    const data =await res.json();
    console.log('addfa');
    console.log(data);

        if(res.status !==200){
        error.innerText ="Hubo un error " + res.status;
    }

}

async function favouritesCats() {
    const res = await fetch(API_FAVOURITES);
    const data = await res.json();

    console.log('Favoritos');
    console.log(data);

 
    if(res.status !==200){
    error.innerText ="Hubo un error " + res.status;
}

    
}
favouritesCats();
nextImg();
