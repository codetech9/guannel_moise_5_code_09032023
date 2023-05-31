// index
let index = 0

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
    line.style.fontSize = "13px";

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
  article.classList.add("articles");

  // On itère sur chacune des images
  mediaList.forEach((media, i) => {

    // répertoire d'images

    const imgDiv = document.createElement("div");
    // imgDiv.style.margin = '25px';
    imgDiv.addEventListener("click", () => {
      // index actuel
      index = i
      showLightBox();
      // changeLightBoxImg(media, photographer.name);
    })

    const img = document.createElement("img");
    if(media.image == undefined) {
      // Affichage d'une video
      const photographerVideo = document.createElement("video");
      let video = `assets/sample/${photographer.name.split(' ')[0]}/${media.video}`;
      photographerVideo.setAttribute("src", video);
      photographerVideo.style.width = "400px";
      photographerVideo.style.height = "450px";
      photographerVideo.style.objectFit = "fill";
      photographerVideo.autoplay = true;
      photographerVideo.style.borderRadius = "5px";
      // Ajout de l'img à la div
      imgDiv.appendChild(photographerVideo);
    } else {
      // Affichage d'une image
      let image = `assets/sample/${photographer.name.split(' ')[0]}/${media.image}`;
      img.setAttribute("src", image);
      img.style.width = "400px";
      img.style.height = "450px";
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

    // hearticone
    let heart = document.createElement("p");
    heart.innerHTML = `<i class="fa-solid fa-heart"></i>`;

    // heartCtn
    let heartCtn = document.createElement("div");
    heartCtn.prepend(like);
    heartCtn.appendChild(heart);
    imgDescription.appendChild(title);
    imgDescription.appendChild(heartCtn);
    imgDescription.classList.add("imgDescription");
    heartCtn.classList.add("heartCtn");

    // Ajout des div au contenair article
    article.appendChild(imgDiv);

    // Ajout de la description
    imgDiv.appendChild(imgDescription);

    imgDiv.classList.add("card-container");

    // AppendChild main
    main.appendChild(article);
  });
  //  // Block likes et tjm
  //  const priceLabelCtn = document.createElement("div");
  //  priceLabelCtn.style.backgroundColor = "#DB8876";
  //  priceLabelCtn.style.position = "absolute";
  //  priceLabelCtn.style.right = "0";
  //  priceLabelCtn.style.bottom = "0";
  //  priceLabelCtn.style.maxWidth = "376px";
  //  priceLabelCtn.style.maxHeight = "89px";
  //  priceLabelCtn.style.display = "flex";
  //  priceLabelCtn.style.justifyContent = "space-around";
  //  priceLabelCtn.style.flexWrap = "nowrap";

  //  // Likes numbers
  //  const likeNumbers = document.createElement("p");
  //  likeNumbers.innerHTML = media.likes + ` <i class="fa-solid fa-heart"></i>`;


  //  // tjm
  //  const tjm = document.createElement("p");
  //  tjm.textContent = `${photographer.price}€ /jour`;
  //  priceLabelCtn.appendChild(likeNumbers);
  //  priceLabelCtn.appendChild(tjm);
  //  main.appendChild(priceLabelCtn);

}


function changeLightBoxImg(media, photographerName){
  // Éléments du DOM
  let lighBoxVideo = document.querySelector("#lightBoxVideo")
  let lightBoxImg = document.querySelector('#lightBoxImg');
  let lightBoxTitle = document.querySelector("#lightbox-title")

  // si lighBoxImg ne renvoi pas undefined alors affiche l'image sinon affiche une vidéo
  if(media.image !== undefined) {
    image = `assets/sample/${photographerName.split(' ')[0]}/${media.image}`;
    lightBoxImg.setAttribute("src", image );
    lighBoxVideo.style.display = "none";
  }else {
    video = `assets/sample/${photographerName.split(' ')[0]}/${media.video}`;
    lightBoxVideo.setAttribute("src", video);
    lightBoxImg.style.display = "none";
  }
  lightBoxTitle.textContent = media.title;
}

function showLightBox(){
  document.querySelector("#lightbox-container").style.display = "block";
}

function hideLightBox(){
  document.querySelector("#lightbox-container").style.display = "none";
}

// récupérer le tableau d'image, index de l'image actuelle, tabImg[index], tabImg[index +1]
function setupLighboxPreviousButton(mediaList, photographerName){

  let previousMedia = document.getElementById("previous-media");
  lightBoxImg = document.querySelector("#lightBoxImg");

  previousMedia.addEventListener("click", function(){
    index--;
    if (index < 0) {
      index = mediaList.length -1;
    }
    lightBoxImg.setAttribute( "src", `assets/sample/${photographerName.split(' ')[0]}/${mediaList[index].image}`);
    lightBoxTitle = document.querySelector('#lightbox-title').innerHTML = mediaList[index].title
  })
}

function setupLighboxNextButton(mediaList, photographerName){
  let nextMedia = document.getElementById("next-media");
  lightBoxImg = document.querySelector("#lightBoxImg");
  nextMedia.addEventListener("click", function(){
    index++;
    if( index >= mediaList.length ){
      index = 0;
    }
    lightBoxImg.setAttribute( "src", `assets/sample/${photographerName.split(' ')[0]}/${mediaList[index].image}`);
    lightBoxTitle = document.querySelector('#lightbox-title').innerHTML = mediaList[index].title;
  })
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
    setupLighboxPreviousButton(mediaList, photographer.name);
    setupLighboxNextButton(mediaList, photographer.name)

};

init();
