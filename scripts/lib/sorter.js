class Sorter {
    static sorter(medias, filter) {

        if (filter === "popular") {
            const sortedMedias = Array.from(medias).sort((a, b) => b.likes - a.likes)
            return sortedMedias

        } else if (filter === "date") {
            const sortedMedias = Array.from(medias).sort((a, b) => new Date(b.date) - new Date(a.date))
            return sortedMedias

        } else if (filter === "title") {
            const sortedMedias = Array.from(medias).sort((a, b) => a.title.localeCompare(b.title))
            return sortedMedias
        } else {
            throw "unknown order type"
        }
    }
}