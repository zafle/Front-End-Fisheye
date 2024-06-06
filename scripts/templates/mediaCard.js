class MediaCard {
    /** Template Pattern for media card (image or video)
     *
     * @param {Object} media
     */
    constructor(media) {
        this._media = media
        this.$wrapper = document.createElement('article')
    }

    // create HTML content of the media card
    createMediaCard() {
        this.$wrapper.classList.add('media__card')
        this.$wrapper.innerHTML = `
            ${this.visual()}
            <div class="media__infos">
                <h3 class="media__title">${this._media.title}</h3>
                <div class="media__likes">
                    <span class="media__likes__count">
                        ${this._media.likes}
                    </span>
                    <img class="media__likes__icon" alt="likes" src="/assets/icons/like.svg" />
                </div>
            </div>
        `
        return this.$wrapper
    }
}

class ImageCard extends MediaCard {
    /** Template Pattern for media card (image or video)
     *
     * @param {Object} media
     */
    constructor(media) {
        super(media)
    }

    // create HTML content for the image picture
    visual() {
        const visual = `
            <img class="media__visual"
                src="${this._media.mediaLink}"
                alt="${this._media.title}"
                aria-label="${this._media.title}, closeup view"
            />
        `
        return visual
    }
}

class VideoCard extends MediaCard {
    /** Template Pattern for media card (image or video)
     *
     * @param {Object} media
     */
    constructor(media) {
        super(media)
    }

    // create HTML content for the video picture
    visual() {
        //  create video links for ogv and webm files
        const videoLink = this._media.mediaLink
        const bareVideoLink = videoLink.split(".")
        const ogvVideoLink = bareVideoLink[0] + ".ogg"
        const webmVideoLink = bareVideoLink[0] + ".webm"

        const visual = `
        <video class="media__visual">
            <source src="${this._media.mediaLink}">
            <source src="${ogvVideoLink}">
            <source src="${webmVideoLink}">
            Your browser doesn't support the video tag.
        </video>
        `
        return visual
    }
}