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
        this.$mediasSection = document.querySelector(".media__section");
    }

    // fetch medias Infos from API
    async fetchMedias() {
        const mediasData = await this._mediasApi.getMediasData(this._photographerId)
        this._medias = mediasData.map(media => new MediaDatas(media))
    }

    // fetch photographer infos from API
    async fetchPhotographer() {
        const photographer = await this._photographerApi.getSinglePhotographerData(this._photographerId)
        this._photographer = photographer.map(photographer => new PhotographerDatas(photographer))
    }

    // display media cards and total likes on page
    async displayMediasCards() {
        await this.fetchMedias()

        this._medias.forEach(media => {
            const Template = new MediaFactory(media, media.mediaType)
            this.$mediasSection.append(Template.createMediaCard())
            Template.runLikesCounter()
        })

        // run lightbox
        const lightbox = new LightBox(this._medias)
        lightbox.runLightbox()
    }

    // display photographer's header
    // display price on page
    // display contact form
    async displayPhotographerInfos() {
        await this.fetchPhotographer()

        const Template = new PhotographerInfos(this._photographer[0])
        Template.displayPhotographerInfo()

        // display contact form
        const photographerName = this._photographer[0].name
        const contactForm = new ContactForm(this._photographerId, photographerName)
        contactForm.runContactForm()
    }
}

async function init() {
    // retrieve photographer's ID
    const urlSearchParams = new URL(document.location).searchParams
    const photographerId = parseInt(urlSearchParams.get("id"))

    const medias = new Medias(photographerId)
    await medias.displayPhotographerInfos()
    await medias.displayMediasCards()
}

init();