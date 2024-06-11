class SorterForm {
    constructor(medias) {
        this._medias = medias

        this.$filterButtons = document.querySelectorAll('.filter-button')
        this.$mediasSection = document.querySelector(".media__section")
        this.$likes = document.querySelectorAll('.media__likes__count')
        this._filters = ["popular", "date", "title"]

    }

    filtersAdd() {
        this.$filterButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const filter = e.target.dataset.filter
                this.sorterMedias(filter)
            })
        })
    }

    updateLikes() {

        const likesValues = []
        this.$likes.forEach( like => {likesValues.push(parseInt(like.innerHTML))} )

        for ( let i = 0; i < likesValues.length; i++) {
            this._medias[i].likes = likesValues[i]
        }
    }

    clearMediasSection() {
        this.$mediasSection.innerHTML = ""
    }

    sorterMedias(filter) {

        if (!this.$mediasSection.classList.contains(filter)) {

            this._filters.forEach(fltr => {
                this.$mediasSection.classList.remove(fltr)
            })
            this.updateLikes()
            this.clearMediasSection()

            const sortedMedias = Sorter.sorter(this._medias, filter)

            sortedMedias.forEach(media => {
                const Template = new MediaFactory(media, media.mediaType)
                this.$mediasSection.append(Template.createMediaCard())
            })

            this.$mediasSection.classList.add(filter)
        }
    }
}