class PhotographerCard {
    /** Template to display photographer Card on homepage
     * or to display photographer header and infos on photographer page
     *
     * @param {Object} photographer
     */
    constructor(photographer) {
        this._photographer = photographer
    }

    // create HTML content for photographerCard on homepage
    createPhotographerCard() {
        const $article = document.createElement('article')
        $article.classList.add('photographer__article')

        const PhotographerCard = `
            <a class="photographer__link"
                href="photographer.html?id=${this._photographer.id}"
                title="Voir la page de ${this._photographer.name}"
                target="_self"
                aria-label="${this._photographer.name}">
                <div class="photographer__img-mask">
                    <img src="${this._photographer.portrait}"/>
                </div>
                <h2 class="photographer__name">${this._photographer.name}</h2>
            </a>
            <p class="photographer__location">${this._photographer.city}, ${this._photographer.country}</p>
            <p class="photographer__tagline">${this._photographer.tagline}</p>
            <p class="photographer__price">${this._photographer.price}</p>
        `
        $article.innerHTML = PhotographerCard
        return $article
    }

    createHeader() {
        const $header = document.querySelector('.photograph-header')

        $header.innerHTML = `
            <div class="photograph-header__infos photograph-header__item">
                <h1 class="photograph-header__title">
                    ${this._photographer.name}
                </h1>
                <p class="photograph-header__location">
                    ${this._photographer.city}, ${this._photographer.country}
                </p>
                <p class="photograph-header__tagline">
                    ${this._photographer.tagline}
                </p>
            </div>
            <button
                class="btn-style btn-hover photograph-header__item"
                id="contact_button"
                aria-label="Contact me">
                Contactez-moi
            </button>
            <div class="photograph-header__portrait photograph-header__item">
                <div class="photographer__img-mask">
                    <img src="${this._photographer.portrait}"
                    alt="${this._photographer.name}"/>
                </div>
            </div>
        `
    }

    displayPrice() {
        const $price = document.querySelector('.global-info__price_tag')
        $price.innerHTML = this._photographer.price
    }

    displayPhotographerInfo() {
        this.createHeader()
        this.displayPrice()
    }
}