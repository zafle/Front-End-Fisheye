class Sorter {
    /** Apply filter to the medias datas
     *
     * @param {Array} medias
     * @param {String} filter
     */
    static sorter(medias, filter) {

        if (filter === "popular") {
            // sort datas according to number of likes in descending order
            const sortedMedias = Array.from(medias).sort((a, b) => b.likes - a.likes)
            return sortedMedias

        } else if (filter === "date") {
            // sort datas according to date in descending order
            const sortedMedias = Array.from(medias).sort((a, b) => new Date(b.date) - new Date(a.date))
            return sortedMedias

        } else if (filter === "title") {
            // sort datas according to title in descending alphabetic order
            const sortedMedias = Array.from(medias).sort((a, b) => a.title.localeCompare(b.title))
            return sortedMedias
        } else {
            throw "unknown order type"
        }
    }
}