function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        let photographerLink = document.createElement("a");
        photographerLink.setAttribute("href", "photographer.html?id=" + id);
        photographerLink.style.textDecoration = "none";
        photographerLink.style.color = "#000000";
        photographerLink.style.visited = "inherit";
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.style.borderRadius = "50%";

        // Name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.style.fontSize = "36px";
        h2.style.marginBottom = "5px";

        // location
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.style.fontSize = "13px";
        location.style.marginTop = "0";
        location.style.marginBottom ="0";
        location.style.color = "#901C1C";

        // tagline
        const line = document.createElement('p');
        line.textContent = tagline;
        line.style.fontSize = "13px";
        line.style.marginTop = "0";
        line.style.marginBottom ="0";


        //price
        const priceperday = document.createElement('p');
        priceperday.textContent = price+"€/jour";
        priceperday.style.fontSize = "12px";
        priceperday.style.marginTop = "0px";
        priceperday.style.color = "#757575";

        // adding all the datas to the article container
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(line);
        article.appendChild(priceperday);
        photographerLink.appendChild(article);
        return (photographerLink);
    }
    return { name, picture, getUserCardDOM }
}
