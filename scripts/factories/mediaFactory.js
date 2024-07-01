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
        try {
            if (this._type === "image") {
                return new ImageCard(this._media)

            } else if (this._type === "video") {
                return new VideoCard(this._media)

            } else {
                throw new Error("Unknown media type format, impossible to create MediaCard")
            }

        } catch(error) {
            console.log(error.message)
        }
    }
}