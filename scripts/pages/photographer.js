//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {

  // Requête pour obtenir les données du fichiers photographers.json
  const response = await fetch("data/photographers.json")

  // on retourne les datas récoltés au niveau du fichier json
  const data = await response.json();
  // Trouve le photographer grace à son id
  const photographer = data.photographers.find(p => p.id == id);
  console.log("p: " + photographer);
  // retourne le photographer
  return photographer;
}


async function displayPhotographerInfo(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    console.log(photographer);

    // Affichage du nom du photographer
    const h2 = document.createElement("h2");
    h2.style.fontSize = "64px";
    h2.style.fontWeight = "400";
    h2.style.color = "#D3573C";
    let nom = photographer.name;
    h2.textContent = nom;

    // location
    const location = document.createElement('p');
    location.textContent = `${photographer.city}`+ ', ' + `${photographer.country}`;
    location.style.color = "#901C1C";
    location.style.fontSize = "13px";

    // tagline
    const line = document.createElement('p');
    line.textContent = photographer.tagline;
    line.style.color= "#525252";
    line.style.fontSize = "13px";

    // Photo de profil du photographer
    const picture = `assets/photographers/${photographer.portrait}`;
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture);
    img.style.borderRadius = "50%";
    img.style.height = "200px";
    img.style.width = "200px";

    // Ajout des données à la page photographer.html
    photographerHeader.prepend(h2);
    h2.appendChild(location);
    location.appendChild(line);
    photographerHeader.appendChild(img);


    // Section trier par:
    const main = document.getElementById("main");
    const sortForm = document.getElementById("sortForm");
    sortForm.style.maxWidth = "1440px";
    sortForm.style.flexDirection = "row";
    sortForm.style.margin = "0 100px";
    sortForm.style.marginTop = "2rem";
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
  article.style.justifyContent = "space-between";
  article.style.flexWrap = "wrap";
  article.style.margin = "0 auto";

  // On itère sur chacune des images
  mediaList.forEach(media => {

    // répertoire d'images
    let image = `assets/sample/${photographer.name.split(' ')[0]}/${media.image}`;
    const imgDiv = document.createElement("div");
    imgDiv.style.border = "10px solid white";
    imgDiv.style.margin = '25px';

    // imgDiv.style.margin = "20px";
    const img = document.createElement("img");
    img.setAttribute("src", image);
    img.style.width = "350px";
    img.style.height = "400px";
    img.style.borderRadius = "5px";

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
    heart = `<i class="fa-solid fa-heart"></i>`;

    // heartctn
    let heartctn = document.createElement("p");
    heartctn.textContent =  media.likes;
    imgDescription.appendChild(title);
    imgDescription.appendChild(heartctn);
    imgDescription.style.display = "flex";
    imgDescription.style.justifyContent = "space-between";
    imgDescription.style.flexWrap = "wrap";

    // Ajout des div au contenair article
    article.appendChild(imgDiv);

    // Ajout de l'img à la div
    imgDiv.appendChild(img);

    // Ajout de la description
    imgDiv.appendChild(imgDescription);

    // AppendChild main
    main.appendChild(article);
  });
}



async function init() {

  // On effectue une recherche  de l'id du  photographe
    const parameters = new URLSearchParams(window.location.search);
    const photographerId = parseInt(parameters.get("id"));
    const photographer = await getPhotographer(photographerId);
    const mediaList = await getMediaList(photographerId);

    // On affiche les données.
    displayPhotographerInfo(photographer);
    displayMediaList(mediaList, photographer);
};

init();
