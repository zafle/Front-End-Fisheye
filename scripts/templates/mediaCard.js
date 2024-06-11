class MediaCard {
    /** Template Pattern for media card (image or video)
     *
     * @param {Object} media
     */
    constructor(media) {
        this._media = media
        this.$likes = document.querySelector('.global-info__likes_count')
    }

    // create HTML content of the media card
    createMediaCard() {
        const wrapper = document.createElement('article')
        wrapper.classList.add('media__card')
        wrapper.innerHTML = `
            <a href=""
                class="media__lightbox-link"
                aria-label="${this._media.title}, closeup view"
                data-id="${this._media.id}"
                title="Ouvrir dans la visionneuse">
                ${this.visual()}
            </a>

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
        return wrapper
    }

    // count likes
    countLikes() {
        const Likes = parseInt(this.$likes.innerHTML)
        const mediaLikes = parseInt(this._media.likes)
        const totalLikes = Likes + mediaLikes
        this.$likes.innerHTML = totalLikes
    }

    // create media slide
    createMediaSlide(mediaId) {
        const liItem = document.createElement('li')
        liItem.classList.add('slider__item')

        if (parseInt(mediaId) === this._media.id) {
            liItem.classList.add('current-view')
            liItem.setAttribute('aria-hidden', 'false')
        } else {
            liItem.setAttribute('aria-hidden', 'true')
        }

        liItem.innerHTML = `
            ${this.visual()}
            <h3 class="slider__title">${this._media.title}</h3>
        `
        return liItem
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
                data-id="${this._media.id}"
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
            <video class="media__visual video-visual"
                    data-id="${this._media.id}">
                <source src="${this._media.mediaLink}">
                <source src="${ogvVideoLink}">
                <source src="${webmVideoLink}">
                Your browser doesn't support the video tag.
            </video>
        `
        return visual
    }
}