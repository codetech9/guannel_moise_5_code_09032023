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
    const h1= document.createElement("h1");
    h1.classList.add("title-design");
    let nom = photographer.name;
    h1.textContent = nom;

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
    img.setAttribute("alt", photographer.portrait);
    img.classList.add("profil-pic");


    const priceperday = document.querySelector("#pricePerDay");
    priceperday.prepend(photographer.price);


    // Ajout des données à la page photographer.html
    photographerInfoCtn.prepend(h1);
    h1.appendChild(location);
    location.appendChild(line);
    photographerHeader.prepend(photographerInfoCtn);
    let photographerProfileCtn = document.createElement("div");
    photographerProfileCtn.appendChild(img)
    photographerHeader.appendChild(photographerProfileCtn);
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


  // MediaSection
  const mediaSection = document.getElementById("media-section");
  mediaSection.innerHTML = "";

  // On itère sur chacune des images
  mediaList.forEach((media, i) => {

    // répertoire d'images
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    const photographerVideo = document.createElement("video");

    if(media.image == undefined) {
      // Affichage d'une video
      let video = `assets/sample/${photographer.name.split(' ')[0]}/${media.video}`;
      photographerVideo.setAttribute("src", video);
      // photographer.setAttribute("alt", video);
      photographerVideo.style.maxWidth = "400px";
      photographerVideo.style.maxHeight = "450px";
      photographerVideo.style.height = "100%";
      photographerVideo.style.width = "100%";
      photographerVideo.style.objectFit = "fill";
      photographerVideo.autoplay = true;
      photographerVideo.loop = true;
      photographerVideo.style.borderRadius = "5px";
      photographerVideo.addEventListener("click", () => {
        // index actuel
        index = i
        showLightBox();
      })
      // Ajout de l'img à la div
      imgDiv.appendChild(photographerVideo);
    } else {
      // Affichage d'une image
      let image = `assets/sample/${photographer.name.split(' ')[0]}/${media.image}`;
      img.setAttribute("src", image);
      img.setAttribute("alt", media.image);
      img.style.maxWidth = "400px";
      img.style.maxHeight = "450px";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.borderRadius = "5px";
      // img.style.objectFit = "cover";
      // document.querySelector("#lightBoxVideo").style.display = "none";
      img.addEventListener("click", () => {
        // index actuel
        index = i
        showLightBox();
      })
      // Ajout de l'img à la div
      imgDiv.appendChild(img);
    }

    // Div de description
    let imgDescription = document.createElement("div");

    // title
    let title = document.createElement("p");
    title.textContent = media.title;


    // hearticone
    let heart = document.createElement("p");
    heart.innerHTML = `<i class="fa-solid fa-heart "></i>`;

    // likes
    let likes = document.createElement("p");
    likes.classList.add(".like-count");
    let  likeCount = media.likes;
    likes.innerHTML = likeCount;
    let likeTotal = document.getElementById("likeTotal");
    heart.addEventListener('click', function() {
      if(!hasLiked(heart)){
        likeCount++
        heart.classList.add("liked");
        likes.innerHTML = likeCount;
        likeTotal.innerHTML= parseInt(likeTotal.textContent) + 1;
      }else {
        likeCount--
        heart.classList.remove("liked");
        likes.innerHTML = likeCount;
        likeTotal.innerHTML = parseInt(likeTotal.textContent) - 1;
      }
    })

    // heartCtn
    let heartCtn = document.createElement("div");
    heartCtn.prepend(likes);
    heartCtn.appendChild(heart);
    imgDescription.appendChild(title);
    imgDescription.appendChild(heartCtn);
    imgDescription.classList.add("imgDescription");
    heartCtn.classList.add("heartCtn");

    // Ajout des div au contenair mediaSection
    mediaSection.appendChild(imgDiv);

    // Ajout de la description
    imgDiv.appendChild(imgDescription);

    imgDiv.classList.add("card-container");
  })
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
  lightBoxVideo = document.querySelector("#lightBoxVideo");
  previousMedia.addEventListener("click", function(){
    index--;
    if (index < 0) {
      index = mediaList.length -1;
    }
    if(mediaList[index].image) {
      lightBoxImg.setAttribute( "src", `assets/sample/${photographerName.split(' ')[0]}/${mediaList[index].image}`);
      lightBoxImg.style.display = "flex";
      lightBoxVideo.style.display = "none";
    }else {
      lightBoxVideo.setAttribute( "src", `assets/sample/${photographerName.split(' ')[0]}/${mediaList[index].video}`);
      lightBoxImg.style.display = "none";
    }
    lightBoxTitle = document.querySelector('#lightbox-title').innerHTML = mediaList[index].title
  })
}

function setupLighboxNextButton(mediaList, photographerName){
  let nextMedia = document.getElementById("next-media");
  lightBoxImg = document.querySelector("#lightBoxImg");
  lightBoxVideo = document.querySelector("#lightBoxVideo");
  nextMedia.addEventListener("click", function(){
    index++;
    if( index >= mediaList.length ){
      index = 0;
    }
    if(mediaList[index].image) {
      lightBoxImg.setAttribute( "src", `assets/sample/${photographerName.split(' ')[0]}/${mediaList[index].image}`);
      lightBoxImg.style.display = "flex";
      lightBoxVideo.style.display = "none";
    }else {
      lightBoxVideo.setAttribute( "src", `assets/sample/${photographerName.split(' ')[0]}/${mediaList[index].video}`);
      lightBoxImg.style.display = "none";
    }
    lightBoxTitle = document.querySelector('#lightbox-title').innerHTML = mediaList[index].title;
  })
}

function hasLiked(heart){
  return heart.classList.contains('liked');
}




// Fonction permettant de connaitre le nombre total de like
function calculateLikesSum(mediaList, sum, likeTotal) {
  likeTotal = document.querySelector("#likeTotal");
  sum = 0
  for(i = 0; i < mediaList.length; i++){
    let likesTotal = mediaList[i].likes
    sum += likesTotal;
  }
  likeTotal.prepend(sum);
}

function mediaListSortForm() {
  const formSelect = document.getElementById("form-select");
  const selects = document.getElementById("selects");
  const angleDown = document.querySelector(".fa-angle-down");
  const angleUp = document.querySelector(".fa-angle-up");
  angleDown.style.display = "none";
  formSelect.addEventListener("click", function(){
    if(selects.style.display === "none"){
      selects.style.display = "flex";
      angleDown.style.display = "block";
      angleUp.style.display = "none";
    }else {
      selects.style.display = "none";
      angleDown.style.display = "none";
      angleUp.style.display = "block";
    }
  })
}

function sortMedialistOrder(mediaList, photographer) {

  const popularite = document.getElementById("popularite");
  const date = document.getElementById("date");
  const titre = document.getElementById("titre");
  const mediaSection = document.getElementById("media-section");

  popularite.addEventListener("click", function(){
    mediaList.sort((a, b) => b.likes - a.likes);
    mediaSection.innerHTML = mediaList;
    displayMediaList(mediaList, photographer)
    console.log("populaire");
      })

  titre.addEventListener("click", function(){
      mediaList.sort((a, b) => a.title.localeCompare(b.title));
      mediaSection.innerHTML = mediaList;
      displayMediaList(mediaList, photographer)
      console.log("titre");
  })

  date.addEventListener("click", function(){
      mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
      mediaSection.innerHTML = mediaList;
      displayMediaList(mediaList, photographer)
      console.log("date");
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
    setupLighboxNextButton(mediaList, photographer.name);
    calculateLikesSum(mediaList);
    mediaListSortForm();
    sortMedialistOrder(mediaList, photographer)
};

init();
