class PhotographerCard {
    /** Template for photographer Card on homepage
     *
     * @param {Object} photographer
     */
    constructor(photographer) {
        this._photographer = photographer
        this.$article = document.createElement('article')
        this.$article.classList.add('photographer__article')
    }

    // create HTML content for photographerCard
    createPhotographerCard() {
        const PhotographerCard = `
            <a class="photographer__link"
                href="photographer.html?id=${this._photographer.id}"
                title="Voir la page de ${this._photographer.name}"
                target="_self"
                role="${this._photographer.name}">
                <div class="photographer__img-mask">
                    <img src="${this._photographer.portrait}"/>
                </div>
                <h2 class="photographer__name">${this._photographer.name}</h2>
            </a>
            <p class="photographer__location">${this._photographer.city}, ${this._photographer.country}</p>
            <p class="photographer__tagline">${this._photographer.tagline}</p>
            <p class="photographer__price">${this._photographer.price}</p>
        `
        this.$article.innerHTML = PhotographerCard
        return this.$article
    }
}