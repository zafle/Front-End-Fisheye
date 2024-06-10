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
        this._photographerLikes = 0
        this._photographerPrice = ""
        this._photographerGlobalInfo = new PhotographerGlobalInfo()

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
        })

        // get array of likes and display total number of likes in aside section
        this._photographerLikes = this._medias.map(media => parseInt(media.likes))
        this._photographerGlobalInfo.displayLikesInfo(this._photographerLikes)

        // run lightbox
        const lightbox = new LightBox(this._medias)
        lightbox.runLightbox()

    }

    // display photographer's header
    // display price on page
    // add eventlistener on contact button's header
    async displayPhotographerHeader() {
        await this.fetchPhotographer()

        const Template = new PhotographerHeader(this._photographer[0])
        Template.createHeader()

        // get photographer price and display price in aside section
        this._photographerPrice = this._photographer[0].price
        this._photographerGlobalInfo.displayPriceInfo(this._photographerPrice)

        // add eventListener on contact button
        // display succes message if form has been send
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
    await medias.displayPhotographerHeader()
    await medias.displayMediasCards()
}

init();