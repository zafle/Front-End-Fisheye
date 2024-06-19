/* global MediaFactory, Sorter */

class SorterForm {
    /** add event listeners on filters buttons
     * send request to filter
     * build the new page with sorted medias
     *
     * @param {Array} medias
     * @param {Object} Lightbox
     */

    constructor(medias, Lightbox) {
        this._medias = medias
        this._Lightbox = Lightbox
        this._likesBackup = []

        this.$menuTrigger = document.querySelector(".medias-filters__menu-trigger")
        this.$menuIcon = document.querySelector(".medias-filters__menu-icon")
        this.$buttonLabel = document.getElementById("medias-filters__label")
        this.$buttonList = document.querySelector(".medias-filters__list")
        this.$filterButtons = document.querySelectorAll(".filter-button")
        this.$mediasSection = document.querySelector(".media__section")
    }

    // ######### BACKUP AND UPDATE LIKES #########

    backupLikes() {
        // before sorter applying, make a backup of new liked values
        // and a backup of medias that already have received a like

        // empty last backup
        this._likesBackup = []

        // backup new values
        for ( let i = 0; i < this._medias.length; i++) {

            // get HTML elements by media id
            const $likes = document.querySelector('.media__likes__count[data-id="' + this._medias[i].id + '"]')
            const $addLike = document.querySelector('.media__likes__add[data-id="' + this._medias[i].id + '"]')

            // if media has been liked, set value on true
            let mediaLiked = ""
            if ($addLike.classList.contains("media-liked")) {
                mediaLiked = true
            } else {
                mediaLiked = false
            }

            // log values in an array (id, likes amount, media liked)
            this._likesBackup.push({
                id: parseInt(this._medias[i].id),
                likes: parseInt($likes.innerHTML),
                liked: mediaLiked
            })
        }
    }

    updateLikes() {
        // loop on backed up likes values and assign them to each media according to media's id
        // add class media-liked to medias that can't receive more like

        //  get new HTML elements by media id logged in the backup array
        for ( let i = 0; i < this._likesBackup.length; i++) {
            const $likes = document.querySelector(`.media__likes__count[data-id="${this._likesBackup[i].id}"]`)
            const $addLike = document.querySelector(`.media__likes__add[data-id="${this._likesBackup[i].id}"]`)

            // set new values of likes and add class media-liked to prevent other like action
            $likes.innerHTML = this._likesBackup[i].likes
            if (this._likesBackup[i].liked === true) {
                $addLike.classList.add("media-liked")
            }
        }
    }

    // ######### CLEAR MEDIA SECTION AND GENERATE NEW MEDIAS CARDS #########

    clearMediasSection() {
        // clear old medias cards in media section
        this.$mediasSection.innerHTML = ""
    }

    sorterMedias(filter) {
        /** Delete MediasCards and generate new MediasCards
         * to build new HTML elements with the selected type of filter
         *
         * @param {String} filter
         */

        // backup likes values
        this.backupLikes()

        // clear media section
        this.clearMediasSection()

        // Apply filter
        const sortedMedias = Sorter.sorter(this._medias, filter)

        // build new medias cards
        sortedMedias.forEach(media => {
            const Template = new MediaFactory(media, media.mediaType)
            this.$mediasSection.append(Template.createMediaCard())
            Template.addLikeEventListener()
        })

        // update likes values
        this.updateLikes()

        // update Lightbox medias and add event listeners on new media cards
        this._Lightbox.updateLightboxWithNewMedias(sortedMedias)
    }

    // ######### OPEN AND CLOSE FILTER MENU #########

    openFilterMenu() {
        // function to open filter menu

        // add class name that indicates that menu is open
        // add aria-expanded attribute to trigger button
        this.$menuTrigger.classList.add("is-opened")
        this.$menuTrigger.setAttribute("aria-expanded", "true")

        // change aria-selected attribute to listbox
        this.$buttonList.setAttribute("aria-selected", "true")

        // get hidden buttons elements
        const $hiddenButtons = document.querySelectorAll(".filter-button.is-hidden")

        // remove hidden class to hidden buttons (=remove css display none)
        // and change aria-hidden attribute to false
        $hiddenButtons.forEach(button => {
            button.classList.remove("is-hidden")
            button.setAttribute("aria-hidden", "false")
        })

        // rotate trigger icon upside down
        this.$menuIcon.style.transform = "rotate(180deg)"
    }

    closeFilterMenu() {
        // function to close filter menu

        // remove class name that indicates that menu is open and change aria-expanded attribute to trigger button
        this.$menuTrigger.classList.remove("is-opened")
        this.$menuTrigger.setAttribute("aria-expanded", "false")

        // remove aria-selected attribute to listbox
        // remove aria-activedescendant attribute to listbox
        this.$buttonList.removeAttribute("aria-selected")
        this.$buttonList.removeAttribute("aria-activedescendant")

        // if button is not selected and button is not supposed to be visible
        // (=> when page load, first button is visible (is-visible class) but not selected)
        // add hidden class to hidden buttons (= css display none)
        // and change aria-hidden attribute to true
        this.$filterButtons.forEach(button => {
            if (!button.classList.contains("is-selected") && !button.classList.contains("is-visible")) {
                button.classList.add("is-hidden")
                button.setAttribute("aria-hidden", "true")
            }
        })

        // rotate trigger icon upside down
        this.$menuIcon.style.transform = "rotate(0deg)"
    }

    // ######### ADD EVENT LISTENER ON MENU TRIGGER AND BUTTONS #########

    onClickMenuTrigger() {
        // on click on trigger menu button, open if closed, close if opened
        this.$menuTrigger.addEventListener("click", () => {

            if (!this.$menuTrigger.classList.contains("is-opened")) {
                this.openFilterMenu()

            } else {
                this.closeFilterMenu()
            }
        })
    }

    onClickFilterButton() {
        // add eventlisteners on filters buttons to launch sorter with the selected filter
        // and add an is-selected class to button that has been clicked
        this.$filterButtons.forEach(button => {
            button.addEventListener("click", (e) => {

                // if the filter has not already been applied
                if (!e.target.classList.contains("is-selected")) {

                    // get eventual other button tha has been clicked before
                    const $selectedButton = document.querySelector(".is-selected")
                    // get eventual first button that is visible but not selected
                    const $visibleButton = document.querySelector(".is-visible")

                    // removes class names
                    if ($selectedButton) {
                        $selectedButton.classList.remove("is-selected")
                    }

                    if ($visibleButton) {
                        $visibleButton.classList.remove("is-visible")
                    }

                    // add class name is-selected to clicked button
                    e.target.classList.add("is-selected")
                    // move button at top of list
                    this.$buttonList.prepend(e.target)

                    // get filter name
                    const filter = e.target.dataset.filter
                    // launch sorter
                    this.sorterMedias(filter)
                }

                // close filter menu
                this.closeFilterMenu()
            })
        })
    }

    onFocusFilterButton() {
        // when a button get focus, the listbox aria-activedescendant attribute get it's id as value
        this.$filterButtons.forEach(button => {
            button.addEventListener("focus", (e) => {
                const buttonId = e.target.id
                this.$buttonList.setAttribute("aria-activedescendant", buttonId)
            })
        })
    }

    onFocusOutFilterButton() {
        // when a button looses focus, check if another has focus to close menu if false
        this.$filterButtons.forEach(button => {
            button.addEventListener("focusout", (e) => {

                // get the new focused area
                const focusedArea = e.relatedTarget
                // variable to store boolean value of "is another button focused ?"
                let isButtonFocused = false

                // loop an each button to know if this button has focus
                this.$filterButtons.forEach(button => {
                    if (button === focusedArea) {
                        isButtonFocused = true
                    }
                })

                // if no button has focus, close the menu
                if (isButtonFocused === false) {
                    this.closeFilterMenu()
                }
            })
        })
    }

    closeMenuOnEscape() {
        // Close menu when escape key is pressed
        document.addEventListener("keydown", e => {
            const keyCode = e.code
            if (this.$menuTrigger.classList.contains("is-opened") && keyCode === "Escape") {
                this.closeFilterMenu()
            }
        })

    }
    // ######### LAUNCH SORTERFORM #########

    runSorterForm() {
        // add click event listener on filter menu trigger
        this.onClickMenuTrigger()
        // add click event listener on filter buttons
        this.onClickFilterButton()
        // add focus event listener on filter buttons
        this.onFocusFilterButton()
        // add focus out event listener on filter buttons
        this.onFocusOutFilterButton()
        // add press escape event listener
        this.closeMenuOnEscape()
    }
}