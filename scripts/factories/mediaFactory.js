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
        if (type === "image") {
            return new ImageCard(media)
        } else if (type === "video") {
            return new VideoCard(media)
        } else {
            throw "Unknown type format"
        }
    }
}