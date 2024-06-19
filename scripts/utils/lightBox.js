/* global ModalControl */
/* global MediaFactory */

class LightBox {
    constructor(medias) {

        this._medias = medias

        // DOM Elements
        this.$mainContainer = document.querySelector('.main-container')
        this.$mediasLinks = document.querySelectorAll('.media__lightbox-link')
        this.$mediasVisuals = document.querySelectorAll('.media__visual')

        // lightbox
        this.$modal = document.getElementById('lightbox_modal')
        this.$closeModal = document.getElementById('close_lightbox')
        this.$slider = document.querySelector('.slider__list')
        this.$previous = document.getElementById('left-arrow')
        this.$next = document.getElementById('right-arrow')

        // Modal Control
        this.ModalControl = new ModalControl(this.$modal, this.$closeModal)
    }

    displayModal(mediaId) {
        /** open modal
         *
         * @param {String} mediaId // data-id of the clicked element
         */

        this.ModalControl.displayModal()
        this.$mainContainer.classList.add('lightbox_modal-open')
        this.createSlider(mediaId)
        this.displayCurrentView()
    }

    closeModal() {
        /** close modal
         *
         */
        this.ModalControl.closeModal()
        this.$mainContainer.classList.remove('lightbox_modal-open')
        this.$slider.innerHTML = ""
    }

    createSlider(mediaId) {
        /** create slider ul
         *
         * @param {String} mediaId // data-id of the clicked element
         */

        this._medias.forEach( media => {
            const Template = new MediaFactory(media, media.mediaType)
            this.$slider.append(Template.createMediaSlide(mediaId))
        })

        const videos = this.$slider.querySelectorAll('.video-visual')
        videos.forEach(video => {
            video.setAttribute('controls', 'controls')
        })
    }

    displayCurrentView() {
        /** change slides order by checking which one is the clicked one (current-view)
         *  if the slide is not current view, it is moved to the end of the list
         *  if it is current view it breaks, then the first slide of the list is current view
         */
        const sliderItems = document.querySelectorAll('.slider__item')
        for( let i = 0; i < sliderItems.length; i++) {
            if (!sliderItems[i].classList.contains('current-view')) {
                this.$slider.append(sliderItems[i])
            } else {
                break
            }
        }
    }

    changeSlide(direction) {
        /** Go to previous or next slide
         *
         * @param {String} direction
         */

        // get all li slides
        const sliderItems = Array.from(document.querySelectorAll('.slider__item'))

        switch (direction) {
            case "previous":
                // remove last li slide and prepend it to ul
                this.$slider.prepend(sliderItems.pop())
                break

            case "next":
                // remove first li slide and append it to ul
                this.$slider.append(sliderItems[0])
                break
        }

        // give current-view class and aria-hidden=false to new first slide
        const currentView = document.querySelector('.current-view')
        currentView.classList.remove('current-view')
        currentView.setAttribute('aria-hidden', 'true')

        const newSliderItems = Array.from(document.querySelectorAll('.slider__item'))
        newSliderItems[0].classList.add("current-view")
        newSliderItems[0].setAttribute('aria-hidden', 'false')
    }

    changeSlideWithArrow() {

        document.addEventListener('keydown', e => {
            const keyCode = e.code
            if (keyCode === "ArrowLeft") {
                this.changeSlide("previous")
            } else if (keyCode === "ArrowRight") {
                this.changeSlide("next")
            }
        })
    }

    runLightbox() {
        // Add event listener to close modal when escape
        this.ModalControl.closeModalOnEscape()

        // Add event listener to trap focus into modal
        this.ModalControl.trapFocus()

        // open modal
        this.$mediasLinks.forEach( link => {
            link.addEventListener("click", (e) => {
                e.preventDefault()
                const mediaId = e.target.dataset.id
                this.displayModal(mediaId)
            })
        })

        // close modal
        this.$closeModal.addEventListener("click", () => {
            this.closeModal()
        })

        // previous slide
        this.$previous.addEventListener("click", () => {
            this.changeSlide("previous")
        })

        // next slide
        this.$next.addEventListener("click", () => {
            this.changeSlide("next")
        })

        // change slide with arrow
        this.changeSlideWithArrow()
    }
}