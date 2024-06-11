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
                    <span class="media__likes__count"
                        data-id="${this._media.id}">
                        ${this._media.likes}
                    </span>
                    <a href=""
                        class="media__likes__add"
                        aria-label="Add a like to ${this._media.title}"
                        data-id="${this._media.id}"
                        title="Ajouter un like">
                            <img class="media__likes__icon"
                                alt="likes"
                                data-id="${this._media.id}"
                                src="/assets/icons/like.svg" />
                    </a>
                </div>
            </div>
        `
        return wrapper
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

    // count likes
    countLikes() {
        let Likes = parseInt(this.$likes.innerHTML)
        const mediaLikes = parseInt(this._media.likes)
        Likes = Likes + mediaLikes
        this.$likes.innerHTML = Likes
    }

    increaseLike($addLike, $mediaId) {

        // if new like
        if(!$addLike.classList.contains("media-liked")) {
            // increase media like
            const $counter = document.querySelector('.media__likes__count[data-id="' + $mediaId + '"]')
            let mediaCount = parseInt($counter.innerHTML)
            mediaCount++
            $counter.innerHTML = mediaCount
            $addLike.classList.add("media-liked")

            // increase photographer total likes
            let totalLikes = parseInt(this.$likes.innerHTML)
            totalLikes++
            this.$likes.innerHTML = totalLikes
        }
    }

    addLikeEventListener() {
        const $addLike = document.querySelector('.media__likes__add[data-id="' + this._media.id + '"]')
        $addLike.addEventListener("click", (e) => {
            e.preventDefault()
            const $mediaId = e.target.dataset.id
            this.increaseLike($addLike, $mediaId)
        })
    }

    runLikesCounter() {
        this.countLikes()
        this.addLikeEventListener()
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