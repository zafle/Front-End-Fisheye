class MediaCard {
    /** Template Pattern for medias (image or video)
     *
     * @param {Object} media
     */
    constructor(media) {
        this._media = media
        this.$likes = document.querySelector('.global-info__likes_count')
    }

    // ############# MEDIA CARD ############

    // create HTML content of the media card

    createMediaCard() {

        // creata tag article
        const wrapper = document.createElement('article')
        wrapper.classList.add('media__card')

        wrapper.innerHTML = `
            <a href="#/"
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
                    <a href="#/"
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



    // count and increase total number of likes at each new Media Card creation
    //
    // this function has to be called only on page loading
    countLikes() {
        //  get the precedent number of likes (0 if this card is the first ceated)
        let Likes = parseInt(this.$likes.innerHTML)

        // get number of likes of this media
        const mediaLikes = parseInt(this._media.likes)

        // Sum up likes
        Likes = Likes + mediaLikes

        // Display total number of likes
        this.$likes.innerHTML = Likes
    }

    increaseLike($addLike, $mediaId) {
        /** function called when a like icon is clicked
         * increase likes for the media clicked
         *
         * @param {HTML Element} $addLike // link (a tag) used to add like
         * @param {String} $mediaId // id of the clicked media
         */

        // if new like (link does not contain media-liked class)
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
        // add event listener on click on the like icon of ech media
        const $addLike = document.querySelector('.media__likes__add[data-id="' + this._media.id + '"]')
        $addLike.addEventListener("click", (e) => {
            e.preventDefault()
            const $mediaId = e.target.dataset.id
            // call the function to increase likes
            // with parameters :
            // - HTLM link element
            // - media id value contained in the data-id attribute of the icon image clicked
            this.increaseLike($addLike, $mediaId)
        })
    }

    runLikesCounter() {
        // general function to call on page loading
        this.countLikes()
        this.addLikeEventListener()
    }

    // ############# LIGHTBOX ############

    createMediaSlide(mediaId) {
        /** create media li HTML element for each slide of the lightbox
         *
         * @param {String} mediaId // clicked media id that launches the caroussel lightbox
         */

        // create li element
        const liItem = document.createElement('li')
        liItem.classList.add('slider__item')

        // if the slide created is the clicked media slide
        if (parseInt(mediaId) === this._media.id) {
            // add class to indicate this slide is to be displayed
            liItem.classList.add('current-view')
            liItem.setAttribute('aria-hidden', 'false')
        } else {
            liItem.setAttribute('aria-hidden', 'true')
        }

        // insert image or video visual and title into slide li tag
        liItem.innerHTML = `
            ${this.visual()}
            <h3 class="slider__title">${this._media.title}</h3>
        `
        return liItem
    }
}

class ImageCard extends MediaCard {
    /** Template Pattern for IMAGE media card
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
    /** Template Pattern for VIDEO media card
     *
     * @param {Object} media
     */
    constructor(media) {
        super(media)
    }

    // create HTML content for the video media
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