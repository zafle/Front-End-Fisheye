class ModalControl {
    /** functions to control modals
     *
     * @param {HTMLElement} modal
     * @param {HTML Element} closeButton
     */
    constructor(modal, closeButton) {
        // DOM Elements
        this.$modal = modal
        this.$closeButton = closeButton
        this.$mainContainer = document.querySelector(".main-container")
    }

    displayModal() {
        // accessibility
        this.$mainContainer.setAttribute("aria-hidden", true)
        this.$mainContainer.setAttribute("aria-disabled", true)
        this.$modal.setAttribute("aria-hidden", false)
        // display modal
        this.$modal.style.display = "flex"
        // put focus on close button
        this.$closeButton.focus()
    }

    closeModal() {
        // accessibility
        this.$mainContainer.setAttribute("aria-hidden", false)
        this.$mainContainer.setAttribute("aria-disabled", false)
        this.$modal.setAttribute("aria-hidden", true)
        // hide modal
        this.$modal.style.display = "none"
    }

    closeModalOnEscape() {
        // Close modal when escape key is pressed
        this.$modal.addEventListener("keydown", e => {
            const isEscapePressed = (e.key === "Escape")
            if (this.$modal.getAttribute("aria-hidden") === "false" && isEscapePressed) {
                this.closeModal()
            }
        })
    }

    trapFocus() {
        // trap focus into modal

        // get first and last focusable elements
        const firstFocusableEl = this.$closeButton
        const lastFocusableEl = this.$modal.querySelector(".last-focusable_element")

        // add event listener on keypress
        this.$modal.addEventListener("keydown", e => {

            const isTabPressed = (e.key === "Tab")

            // if keypress is not tab, return
            if (!isTabPressed) {
                return
            }

            // if is shift + tab and first element is focused, focus the last one
            if ( e.shiftKey ) /* shift + tab */ {
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus()
                    e.preventDefault()
                }

                // if is tab and last element is focused, focus the first one
            } else /* tab */ {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus()
                    e.preventDefault()
                }
            }
        })
    }
}