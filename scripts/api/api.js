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
        const photographersDatas = await this.getDatas()
        this._photographers = photographersDatas.photographers

        return this._photographers
    }

    async getSinglePhotographerData(id) {
        this._photographers = await this.getAllPhotographersData()
        this._photographer = this._photographers.filter(
            photographer => photographer.id === id
        )
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
        const mediasDatas = await this.getDatas()
        this._medias = mediasDatas.media.filter(media => media.photographerId === id)
        return this._medias
    }

}