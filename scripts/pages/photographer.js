//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {

  // Requête pour obtenir les données du fichiers photographers.json
  const response = await fetch("data/photographers.json")

  // on retourne les datas récoltés au niveau du fichier json
  const data = await response.json();
  // Trouve le photographer grace à son id
  const photographer = data.photographers.find(p => p.id == id);
  // retourne le photographer
  return photographer;
}

async function displayPhotographerInfo(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    // Affichage du nom du photographer
    const photographerInfoCtn = document.createElement("div")
    const h2 = document.createElement("h2");
    h2.classList.add("title-design");
    let nom = photographer.name;
    h2.textContent = nom;

    // location
    const location = document.createElement('p');
    location.textContent = `${photographer.city}`+ ', ' + `${photographer.country}`;
    location.style.color = "#901C1C";
    location.classList.add('font-sizing');

    // tagline
    const line = document.createElement('p');
    line.textContent = photographer.tagline;
    line.style.color= "#525252";
    line.style.classList.add('font-sizing');

    // Photo de profil du photographer
    const picture = `assets/photographers/${photographer.portrait}`;
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture);
    img.classList.add("profil-pic");


    // Ajout des données à la page photographer.html
    photographerInfoCtn.prepend(h2);
    h2.appendChild(location);
    location.appendChild(line);
    photographerHeader.prepend(photographerInfoCtn);
    let photographerProfileCtn = document.createElement("div");
    photographerProfileCtn.appendChild(img)
    photographerHeader.appendChild(photographerProfileCtn);


    // Section trier par:
    const main = document.getElementById("main");
    const sortForm = document.getElementById("sortForm");
    sortForm.classList.add("sortForm");
    const label = document.createElement("label");
    label.style.fontSize = "18px";
    label.style.marginRight = "10px";
    label.innerHTML = "Trier par ";
    sortForm.appendChild(label);

    //Create array of options to be added
    const array = ["Popularité","Date","Titre"];

    //Create and append select list
    const selectList = document.createElement("select");
    selectList.id = "mySelect";
    selectList.style.color= "white";
    selectList.style.backgroundColor="#901C1C";
    selectList.style.borderColor="#901C1C";

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
    }
    sortForm.append(selectList);
    main.appendChild(sortForm);
}

///////////////////////////////-- MEDIA --//////////////////////////////////////


async function getMediaList(id) {
  // Requête pour obtenir les données du fichiers photographers.json
  const response = await fetch("data/photographers.json")
  // on retourne les datas récoltés au niveau du fichier json
  const data = await response.json();
  // Trouve le photographer grace à son id
  const mediaList = data.media.filter(m => m.photographerId == id);
  // retourne le media
  return mediaList;
}




async function displayMediaList(mediaList, photographer) {

  //appendChild to main
  const main = document.getElementById("main");

  // Article
  const article = document.createElement("article");
  article.style.maxWidth = "1300px";
  article.style.flexDirection = "row";
  article.style.display = "flex";
  article.style.flexWrap = "wrap";
  article.style.justifyContent = "space-between";
  article.style.flexWrap = "wrap";
  article.style.margin = "0 auto";
  article.style.padding = "0";

  // On itère sur chacune des images
  mediaList.forEach(media => {

    // répertoire d'images
    let image = `assets/sample/${photographer.name.split(' ')[0]}/${media.image}`;
    let video = `assets/sample/${photographer.name.split(' ')[0]}/${media.video}`;
    console.log(video);
    const imgDiv = document.createElement("div");
    imgDiv.style.margin = '25px';
    imgDiv.addEventListener("click", () => {
      showLightBox();
      changeLightBoxImg(image, video, media.title);
    })

    const img = document.createElement("img");
    if(media.image == undefined) {
      // Affichage d'une video
      const PhotograherVideo = document.createElement("video");
      PhotograherVideo.setAttribute("src", video);
      PhotograherVideo.style.width = "350px";
      PhotograherVideo.style.height = "400px";
      PhotograherVideo.autoplay = true;
      // Ajout de l'img à la div
      imgDiv.appendChild(PhotograherVideo);
    } else {
      // Affichage d'une image
      img.setAttribute("src", image);
      img.style.width = "350px";
      img.style.height = "400px";
      img.style.borderRadius = "5px";
      // Ajout de l'img à la div
      imgDiv.appendChild(img);
    }


    // title
    let title = document.createElement("p");
    title.textContent = media.title;

    // likes
    let like = document.createElement("p");
    like.textContent = media.likes;

    // Div de description
    let imgDescription = document.createElement("div");
    imgDescription.style.color = "#901C1C";

    // hearticone
    let heart = document.createElement("p");
    heart.innerHTML = `<i class="fa-solid fa-heart"></i>`;


    // heartCtn
    let heartCtn = document.createElement("p");
    heartCtn.innerHTML = media.likes  +  "   " +  `<i class="fa-solid fa-heart"></i>`;
    imgDescription.appendChild(title);
    imgDescription.appendChild(heartCtn);
    imgDescription.appendChild(heartCtn);
    heartCtn.style.display = "flex";
    heartCtn.style.alignItems = "start";
    heartCtn.style.justifyContent = "start";
    imgDescription.style.display = "flex";
    imgDescription.style.justifyContent = "space-between";
    imgDescription.style.flexWrap = "wrap";



    // Ajout des div au contenair article
    article.appendChild(imgDiv);



    // Ajout de la description
    imgDiv.appendChild(imgDescription);

    imgDiv.classList.add("card-container");


    // AppendChild main
    main.appendChild(article);
  });


   // Block likes et tjm
  const priceLabelCtn = document.createElement("div");
  priceLabelCtn.style.backgroundColor = "#DB8876";
  priceLabelCtn.style.position = "absolue";
  priceLabelCtn.style.right = "0";
  priceLabelCtn.style.bottom = "0";
  priceLabelCtn.style.maxWidth = "376px";
  priceLabelCtn.style.maxHeight = "89px";
  priceLabelCtn.style.display = "flex";
  priceLabelCtn.style.justifyContent = "space-around";
  priceLabelCtn.style.flexWrap = "nowrap";


   // Likes numbers
  const likeNumbers = document.createElement("p");
  likeNumbers.textContent = "297 081";

  // tjm
  const tjm = document.createElement("p");
  tjm.textContent = `${photographer.price}€ /jour`;
  priceLabelCtn.appendChild(likeNumbers);
  priceLabelCtn.appendChild(tjm);
  main.appendChild(priceLabelCtn);
}

//


function changeLightBoxImg(image, video, title, photographer){

  let lightBoxImg = document.querySelector('#lightBoxImg');
  // si lighBoxImg ne renvoi pas undefined alors affiche l'image sinon affiche une vidéo
  if(image !== undefined) {
    lightBoxImg.setAttribute("src", image);
  }else {
    let lighBoxVideo = document.querySelector("#lightBoxVideo")
    video = `assets/sample/${photographer.name.split(' ')[0]}/${media.video}`;
    console.log(video);
    lightBoxVideo.setAttribute("src", video);
    console.log(lighBoxVideo);
  }

  // Affichage du titre de l'image ou de la vidéo actuelle
  let lightBoxTitle = document.querySelector("#lightbox-title")
  lightBoxTitle.textContent = title;
}




function showLightBox(){
  document.querySelector("#lightbox-container").style.display = "block";
}

function hideLightBox(){
  document.querySelector("#lightbox-container").style.display = "none";
}

// on récupère l'id du photographe
function getPhotographerId() {
  const parameters = new URLSearchParams(window.location.search);
  return parseInt(parameters.get("id"));
}


async function init() {
  const photographerId = getPhotographerId()

    // On récupère les informations grace à l'id du photographe
    const photographer = await getPhotographer(photographerId);
    const mediaList = await getMediaList(photographerId);

    // On affiche les données.
    displayPhotographerInfo(photographer);
    displayMediaList(mediaList, photographer);

};

init();
