function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const imgWrapper = document.createElement('div')
        imgWrapper.classList.add('photographer_wrapper')
        const img = document.createElement( 'img' );
        imgWrapper.appendChild(img)
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(imgWrapper);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}