    class Photographers {
        /** Fetch photographers data and display them on homepage
         *
         */
        constructor() {
            // Api
            this._photographersApi = new PhotographersApi('/data/photographers.json')

            // Photographers
            this._photographers = []

            //  DOM elements
            this.$photographersSection = document.querySelector(".photographer__section")
        }

        async fetchPhotographers() {
            const photographersData = await this._photographersApi.getAllPhotographersData()
            this._photographers = photographersData.map(photographer => new PhotographerDatas(photographer))
        }


        async displayPhotographersCards() {
            await this.fetchPhotographers()

            this._photographers.forEach(photographer => {
                const Template = new PhotographerCard(photographer)
                this.$photographersSection.append(Template.createPhotographerCard())
            })
        }
    }

    async function init() {
        const photographers = new Photographers()
        await photographers.displayPhotographersCards()
    }

    init()
