class PhotographerGlobalInfo {
    /** Template for photographer's global info on photographer page
     * Displays total number of likes and price
     *
     */
    constructor() {
        this._likes = 0
        this._price = ""

        this.$mainSection = document.getElementById('main')
        this.$globalInfo = document.createElement('aside')
        this.$likesInfo = document.createElement('div')
        this.$priceInfo = document.createElement('div')

        this.$globalInfo.classList.add('global-info')
        this.$likesInfo.classList.add('global-info__likes')
        this.$priceInfo.classList.add('global-info__price')

        this.$globalInfo.append(this.$likesInfo)
        this.$globalInfo.append(this.$priceInfo)
        this.$mainSection.append(this.$globalInfo)
    }

    displayLikesInfo(likes) {

        likes.forEach(like => {
            this._likes += like
        })

        this.$likesInfo.innerHTML = `
            <span class="global-info__likes_count">${this._likes}</span>
            <img src="/assets/icons/black-like.svg" alt="likes" class=""/>
        `
    }

    displayPriceInfo(price) {

        this._price = price

        this.$priceInfo.innerHTML = `
            <span class="global-info__price_tag">${this._price}</span>
        `
    }
}
