/* global ImageCard, VideoCard */

class MediaFactory {
    /** Factory Pattern
     * Assign media data either to ImageCard or VideoCard,
     * according to its type.
     *
     * @param {Object} media
     * @param {string} type
     */
    constructor(media, type) {
        this._media = media
        this._type = type
    }

    createMedia() {
        if (this._type === "image") {
            return new ImageCard(this._media)

        } else if (this._type === "video") {
            return new VideoCard(this._media)
        }
    }
}