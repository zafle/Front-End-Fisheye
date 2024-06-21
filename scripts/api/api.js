class Api {
    /** Connect to API and return datas
     *
     * @param {string} url
     */
    constructor(url) {
        this._url = url
    }

    async getDatas() {
        return fetch(this._url)
            .then(response => response.json())
            .catch(err => console.log("an error occured", err))
    }
}

class PhotographersApi extends Api {
    /** Fetch photographers datas from API
     *
     * @param {string} url
     */
    constructor(url) {
        super(url)
        this._photographers = []
        this._photographer = []
    }

    async getAllPhotographersData() {
        // return all photographers datas
        const photographersDatas = await this.getDatas()
        this._photographers = photographersDatas.photographers

        return this._photographers
    }

    async getSinglePhotographerData(id) {
        /** return photographer's data from which the id is given
         *
         * @param {Number} id
         */
        this._photographers = await this.getAllPhotographersData()
        this._photographer = this._photographers.filter(photographer => photographer.id === id)
        return this._photographer
    }
}
class MediasApi extends Api {
    /** Fetch medias datas from API
     *
     * @param {string} url
     */
    constructor(url) {
        super(url)
        this._medias = []
    }

    async getMediasData(id) {
        /** return medias from photographer's from which the id is given
         *
         * @param {Number} id
         */
        const mediasDatas = await this.getDatas()
        this._medias = mediasDatas.media.filter(media => media.photographerId === id)
        return this._medias
    }

}