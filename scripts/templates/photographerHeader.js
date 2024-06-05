class PhotographerHeader {
    /** Template for photographer's header on photographer page
     *
     * @param {Object} photographer
     */
    constructor(photographer) {
        this._photographer = photographer
        this.$header = document.querySelector('.photograph-header')
        this.$infos = document.createElement('div')
        this.$portrait = document.createElement('div')
    }

    // create HTML content for photographer's header
    createHeader() {
        this.$infos.innerHTML = `
            <h1 class="photograph-header__title">
                ${this._photographer.name}
            </h1>
            <p class="photograph-header__location">
                ${this._photographer.city}, ${this._photographer.country}
            </p>
            <p class="photographer-header__tagline">
                ${this._photographer.tagline}
            </p>
        `
        this.$portrait.innerHTML = `
            <div class="photographer__img-mask">
                <img src="${this._photographer.portrait}"
                alt="${this._photographer.name}"/>
            </div>
        `

        this.$infos.classList.add('photograph-header__infos')
        this.$portrait.classList.add('photograph-header__portrait')

        this.$header.prepend(this.$infos)
        this.$header.append(this.$portrait)
    }
}