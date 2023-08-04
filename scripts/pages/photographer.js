// // index
let index = 0

// on récupère l'id du photographe
function getPhotographerId() {
  const parameters = new URLSearchParams(window.location.search);
  return parseInt(parameters.get("id"));
}

//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {
  const response = await fetch("data/photographers.json")
  const data = await response.json();
  const photographer = data.photographers.find(p => p.id == id);
  return new Photographer(photographer);
}

async function displayPhotographer(photographer) {
  document.getElementById("photographer-name").innerHTML = photographer.name
  document.getElementById("photographer-name").setAttribute("alt", photographer.name)
  document.getElementById("photographer-portrait").setAttribute("src", photographer.portrait)
}

async function  getMediaList(id) {
  const response = await fetch("data/photographers.json")
  const data = await response.json();
  const mediaList = data.media.filter(m => m.photographerId == id)
  let medias = []
  for(let i = 0; i <  mediaList.length; i++){
    medias.push(new Media(mediaList[i].title, mediaList[i].image, mediaList[i].video, mediaList[i].likes, mediaList[i].date, mediaList[i].price))
  }
  return medias
}

async function displayMediaList(photographer, mediaList){
  mediaList.forEach((media, i) => {
    let mediaCard = document.createElement("div");
    mediaCard.classList.add("card-container")
    const img = document.createElement("img")
    const photographerVideo = document.createElement("video")
    if(!media.image){
      photographerVideo.setAttribute("src", `/assets/sample/${photographer.name.split(' ')[0]}/${media.video}`);
      photographerVideo.classList.add("cardphotographerVideo");
      photographerVideo.autoplay = true;
      photographerVideo.loop = true;
      photographerVideo.classList.add("cardVideo")
      photographerVideo.addEventListener("click", () => {
        // index actuel
        index = i
        showLightBox();
      })

      mediaCard.appendChild(photographerVideo)
    }else {
      img.setAttribute("src", `/assets/sample/${photographer.name.split(' ')[0]}/${media.image}`)
      img.setAttribute("alt", media.image)
      img.classList.add("cardImg");
      img.addEventListener("click", () => {
      // index actuel
      index = i
      showLightBox();
      })
      mediaCard.appendChild(img)
    }

    let mediaDescription = document.createElement("div");
    mediaDescription.classList.add("mediaDescription");
    const mediaSection = document.getElementById("media-section")

    const title  = media.title

    // hearticone
    let heart = document.createElement("p");
    heart.innerHTML = `<i class="fa-solid fa-heart "></i>`;

    // likes
    let likes = document.createElement("p");
    likes.classList.add(".like-count");
    let  likeCount = media.likes;
    likes.innerHTML = likeCount;
    // heartCtn
    let heartCtn = document.createElement("div");
    heartCtn.prepend(likes);
    heartCtn.appendChild(heart);
    heartCtn.classList.add("heartCtn");
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

    mediaDescription.prepend(title)
    mediaDescription.appendChild(heartCtn)
    mediaCard.appendChild(mediaDescription)
    mediaSection.appendChild(mediaCard)
  });

  const priceperday = document.querySelector("#pricePerDay");
  priceperday.prepend(photographer.price);
}


function showLightBox(){
  document.querySelector("#lightbox-container").style.display = "block";
}

function hideLightBox(){
  document.querySelector("#lightbox-container").style.display = "none";
}

function previousMedia(mediaList, photographerName, event){
  if (event.keyCode === 37) {
    // Code pour gérer l'appui sur la flèche directionnelle gauche ici
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
      lightBoxVideo.style.display = "block";
      lightBoxImg.style.display = "none";
    }
    lightBoxTitle = document.querySelector('#lightbox-title').innerHTML = mediaList[index].title
  }
}

// // récupérer le tableau d'image, index de l'image actuelle, tabImg[index], tabImg[index +1]
function setupLighboxPreviousButton(mediaList, photographerName){

  const previousMediaArrow = document.getElementById("previous-media");
  lightBoxImg = document.querySelector("#lightBoxImg");
  lightBoxVideo = document.querySelector("#lightBoxVideo");
  previousMediaArrow.addEventListener("click",() => previousMedia(mediaList, photographerName))
  document.addEventListener("keydown", () => previousMedia(mediaList, photographerName, event))
}

function nextMedia(mediaList, photographerName, event){
  if (event.keyCode === 39) {
    // Code pour gérer l'appui sur la flèche directionnelle droite ici
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
      lightBoxVideo.style.display = "block";
    }
    lightBoxTitle = document.querySelector('#lightbox-title').innerHTML = mediaList[index].title;
  }

}


function setupLighboxNextButton(mediaList, photographerName){
  const nextMediaArrow = document.getElementById("next-media");
  lightBoxImg = document.querySelector("#lightBoxImg");
  lightBoxVideo = document.querySelector("#lightBoxVideo");
  nextMediaArrow.addEventListener("click", () => nextMedia(mediaList, photographerName))
  document.addEventListener("keydown", () => nextMedia(mediaList, photographerName, event))
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
    mediaList.sort((a, b) => b.likes - a.likes)
    mediaSection.innerHTML = mediaList;
    displayMediaList( photographer, mediaList)
    console.log("populaire");
      })

  titre.addEventListener("click", function(){
      mediaList.sort((a, b) => a.title.localeCompare(b.title));
      mediaSection.innerHTML = mediaList;
      displayMediaList( photographer, mediaList)
      console.log("titre");
  })

  date.addEventListener("click", function(){
      mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
      mediaSection.innerHTML = mediaList;
      displayMediaList(photographer, mediaList)
      console.log("date");
  })
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

function hasLiked(heart){
  return heart.classList.contains('liked');
}

async function init() {
  const id = getPhotographerId()
  const photographer = await getPhotographer(id)
  displayPhotographer(photographer)
  const mediaList = await getMediaList(id)
  displayMediaList(photographer, mediaList)
  calculateLikesSum(mediaList);
  setupLighboxPreviousButton(mediaList, photographer.name);
  setupLighboxNextButton(mediaList, photographer.name);
  showLightBox()
  hideLightBox()
  mediaListSortForm()
  sortMedialistOrder(mediaList, photographer)
}
init()
