class ModalControl {
    constructor(modal, closeButton) {
        // DOM Elements
        this.$modal = modal
        this.$closeButton = closeButton
        this.$mainContainer = document.querySelector('.main-container')
    }

    displayModal() {
        // accessibility
        this.$mainContainer.setAttribute('aria-hidden', true)
        this.$mainContainer.setAttribute('aria-disabled', true)
        this.$modal.setAttribute('aria-hidden', false)
        this.$modal.style.display = "flex"
        this.$closeButton.focus()
    }

    closeModal() {
        // accessibility
        this.$mainContainer.setAttribute('aria-hidden', false)
        this.$mainContainer.setAttribute('aria-disabled', false)
        this.$modal.setAttribute('aria-hidden', true)
        this.$modal.style.display = "none";
    }

    closeModalOnEscape() {
        // Close modal when escape key is pressed
        document.addEventListener('keydown', e => {
            const keyCode = e.code
            if (this.$modal.getAttribute('aria-hidden') === 'false' && keyCode === "Escape") {
                this.closeModal()
            }
        })
    }
}