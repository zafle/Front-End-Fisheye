class LightBox {
    constructor(medias) {
        this._medias = medias

        // DOM Elements
        this.$mainContainer = document.querySelector('.main-container')
        this.$modal = document.getElementById('lightbox_modal')
        this.$closeModal = document.getElementById('close_lightbox')
        this.$slider = document.querySelector('.slider__list')
        this.$mediasCards = document.querySelectorAll('.media__card')
        this.$mediasVisuals = document.querySelectorAll('.media__visual')

        // Modal Control
        this.ModalControl = new ModalControl(this.$modal, this.$closeModal)
    }

    displayModal() {
        this.ModalControl.displayModal()
        this.$mainContainer.classList.add('lightbox_modal-open')
        this.createSlider()


    }

    closeModal() {
        this.ModalControl.closeModal()
        this.$mainContainer.classList.remove('lightbox_modal-open')

    }

    createSliderItem(media) {
        const liItem = document.createElement('li')
        liItem.classList.add('slider__item')

        const visual = media.querySelector('.media__visual')
        const mediaItem = visual.cloneNode(true)
        mediaItem.classList.add('slider__visual')
        mediaItem.classList.remove('media__visual')
        if (mediaItem.classList.contains('video-visual')) {
            mediaItem.setAttribute('controls', 'controls')
        }

        const title = media.querySelector('.media__title')
        const titleItem = title.cloneNode(true)
        titleItem.classList.add('slider__title')
        titleItem.classList.remove('media__title')

        liItem.append(mediaItem)
        liItem.append(titleItem)

        this.$slider.append(liItem)
    }

    createSlider() {
        this.$mediasCards.forEach( media => {
            this.createSliderItem(media)
        })

    }

    runLightbox() {

        // Add event listener to close modal when escape
        this.ModalControl.closeModalOnEscape()

        // open modal
        this.$mediasVisuals.forEach( visual => {
            visual.addEventListener("click", () => {
                console.log("click")
                this.displayModal()
            })

        })

        // close modal
        this.$closeModal.addEventListener("click", () => {
            this.closeModal()
        })
    }
}