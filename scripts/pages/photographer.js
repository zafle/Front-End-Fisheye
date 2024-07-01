/* global PhotographersApi, MediasApi, MediaDatas, PhotographerDatas, MediaFactory, LightBox, SorterForm, PhotographerCard, ContactForm */

class Medias {
    /** Fetch medias datas relative to photographer and display them on the photographer page
     *
     * @param {Number} id
     */
    constructor(id) {
        // Apis
        this._photographerApi = new PhotographersApi("/data/photographers.json")
        this._mediasApi = new MediasApi("/data/photographers.json")

        // Medias
        this._photographerId = id
        this._medias = []
        this._photographer = []

        //  DOM elements
        this.$mediasSection = document.querySelector(".media__section")
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
            const Template = new MediaFactory(media, media.mediaType).createMedia()
            this.$mediasSection.append(Template.createMediaCard())
            Template.runLikesCounter()
        })

        // run lightbox
        const Lightbox = new LightBox(this._medias)
        Lightbox.runLightbox()

        // run Sorter Medias Filter
        const sorterMedias = new SorterForm(this._medias, Lightbox)
        sorterMedias.runSorterForm()
    }

    // display photographer's header
    // display price on page
    async displayPhotographerInfos() {
        await this.fetchPhotographer()

        const Template = new PhotographerCard(this._photographer[0])
        Template.displayPhotographerInfo()

        // display contact form
        const contactForm = new ContactForm(this._photographerId, this._photographer[0].name)
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

init()