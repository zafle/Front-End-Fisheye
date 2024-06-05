class MediaDatas {
    /** Assign media datas to object properties
     *
     * @param {Array} media
     */
    constructor(media) {
        this._id = media.id
        this._photographerId = media.photographerId
        this._title = media.title
        this._likes = media.likes
        this._date = media.date
        this._price = media.price
        this._mediaLink = media.image? media.image: media.video
        this._mediaType = media.image? "image": "video"
    }

    get id() {
        return this._id
    }
    get photographerId() {
        return this._photographerId
    }
    get title() {
        return this._title
    }
    get likes() {
        return this._likes
    }
    get date() {
        return this._date
    }
    get price() {
        return `${this._price}€ / jour`
    }
    get mediaLink() {
        return `/assets/medias/photographer_${this._photographerId}/${this._mediaLink}`
    }
    get mediaType() {
        return this._mediaType
    }
}