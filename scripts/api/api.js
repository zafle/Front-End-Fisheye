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
            .catch(err => console.log('an error occured', err))
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
    }

    async getPhotographersData() {
        const photographersDatas = await this.getDatas()
        this._photographers = photographersDatas.photographers

        return this._photographers
    }
}