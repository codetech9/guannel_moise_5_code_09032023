    async function getPhotographers() {
      // Requête pour obtenir les données du fichiers photographers.json
      const response = await fetch("data/photographers.json")
      // on retourne les datas récoltés au nivxeau du fichier json
      return response.json();
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async  function init() {
        // Récupère les datas des photographes
        const {photographers} = await getPhotographers();
        displayData(photographers);
    };

    init();
