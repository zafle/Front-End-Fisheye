class PhotographerHeader {
    /** Template for photographer's header on photographer page
     *
     * @param {Object} photographer
     */
    constructor(photographer) {
        this._photographer = photographer
        this.$header = document.querySelector('.photograph-header')
    }

    // create HTML content for photographer's header
    createHeader() {
        this.$header.innerHTML = `
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
                aria-label="Contact me"
                data-id="${this._photographer.id}"
                onclick="displayModal()">
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
}