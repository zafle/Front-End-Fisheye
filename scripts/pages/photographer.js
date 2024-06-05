class Medias {
    /** Fetch medias datas relative to photographer and display them on the photographer page
     *
     * @param {Number} id
     */
    constructor(id) {
        // Apis
        this._photographerApi = new PhotographersApi('/data/photographers.json')
        this._mediasApi = new MediasApi('/data/photographers.json')

        // Medias
        this._photographerId = id
        this._medias = []
        this._photographer = []

        //  DOM elements
        this.$mediasSection = document.querySelector(".medias__section");
    }

    // fetch medias from API
    async fetchMedias() {
        const mediasData = await this._mediasApi.getMediasData(this._photographerId)
        this._medias = mediasData.map(media => new MediaDatas(media))
    }

    // fetch photographer from API
    async fetchPhotographer() {
        const photographer = await this._photographerApi.getSinglePhotographerData(this._photographerId)
        this._photographer = photographer.map(photographer => new PhotographerDatas(photographer))
    }

    // display media cards on page
    async displayMediasCards() {
        await this.fetchMedias()

        this._medias.forEach(media => {
            const Template = new MediaFactory(media, media.mediaType)
            this.$mediasSection.append(Template.createMediaCard())
        })
    }

    // display photographer's infos on page
    async displayPhotographerHeader() {
        await this.fetchPhotographer()

        const Template = new PhotographerHeader(this._photographer[0])
        Template.createHeader()
    }
}

async function init() {
    // retrieve photographer's ID
    const urlSearchParams = new URL(document.location).searchParams
    const photographerId = parseInt(urlSearchParams.get("id"))

    const medias = new Medias(photographerId)
    await medias.displayPhotographerHeader()
    await medias.displayMediasCards()
}

init();