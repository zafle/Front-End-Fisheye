class ContactForm {
    /** Display, check and send contact form
     *
     * @param {string} id
     * @param {string} name
     */
    constructor(id, name) {
        this._photographerId = id
        this._photographerName = name

        //  DOM Elements
        // this.$mainContainer = document.querySelector('.main-container')
        this.$contactButton = document.getElementById('contact_button')
        // modal
        this.$modal = document.getElementById('contact_modal')
        this.$dialog = document.querySelector('.contact_modal__dialog')
        this.$closeModal = document.getElementById('close_contact-form')
        this.$title = document.getElementById('contact_title')
        // form
        this.$contactForm = document.getElementById('contact_form')
        this.$firstName = document.getElementById('firstname')
        this.$lastName = document.getElementById('lastname')
        this.$email = document.getElementById('email')
        this.$message = document.getElementById('message')
        this.$inputId = document.getElementById('photographer-id')
        this.$submit = document.querySelector('.submit_button')

        // Modal control / Modal Observers
        this.ModalControl = new ModalControl(this.$modal, this.$closeModal)
    }

    displayModal() {
        this.ModalControl.displayModal()

        // add photographer's name in header
        this.$title.innerHTML = `Contactez-moi<br>${this._photographerName}`

        // add photographer's ID in the form's hidden input
        this.$inputId.value = `${this._photographerId}`
    }

    closeModal() {
        this.ModalControl.closeModal()

        // if success message is displayed
        const $successMessage = document.querySelector('.success-message')
        if ($successMessage) {

            // remove success message and display contact form
            $successMessage.remove()
            this.$contactForm.style.display ="block"

            // delete parameters from URL whithout reloading the page
            const newLocation = `photographer.html?id=${this._photographerId}`
            window.history.replaceState(null, '', "/" + newLocation)
        }
    }

    /**
     * functions to validate each form input
     * @param {HTMLElement} input
     */
    validateFirstName(input) {
        if (input.value.length < 2) {
            throw new Error("Le prénom doit comporter au moins 2 caractères")
        }
    }

    validateLastName(input) {
        if (input.value.length < 1) {
            throw new Error("Le nom doit comporter au moins 1 caractère")
        }
    }

    validateEmail(input) {
        const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
        if (!emailRegExp.test(input.value)) {
            throw new Error("L'email doit être valide");
        }
    }

    validateMessage(input) {
        if (input.value.length < 4) {
            throw new Error("Le message doit comporter au moins 4 caractères")
        }
    }

    // Display and erase error messages

    /**
     * This function displays an error message
     * @param {HTMLElement} input
     * @param {Error} error
     */
    displayErrorMessage(input, error) {
        const $spanError = document.createElement('span')
        const $parent = input.closest(".formData");
        const label = $parent.getElementsByTagName('label')[0].id

        input.setAttribute('aria-invalid', true)
        $spanError.classList.add('error')
        $spanError.setAttribute('aria-labelledby', label)
        $spanError.innerHTML = error.message

        $parent.append($spanError);
    }

    /**
     * This function reset error messages
     * @param {HTMLElement} input
     */
    resetErrorMessage(input) {
        const $parent = input.closest(".formData");
        const $spanError = $parent.querySelector('.error')

        if ($parent.contains($spanError)) {
            $spanError.remove()
            input.removeAttribute('aria-invalid')
        }
    }

    // Function to validate an Input
    /**
     * This function erases the previous errors messages,
     * call the validation function for each input (validate parameter)
     * and displays the error message if validation failed
     * @param {HTMLElement} input /to target the sopecified HTML element when erase / display error message
     * @param {function} validate /function to validate the input
     * @param {number} errors /count the number of errors during the submit validation process
     * @return {number}
     */
    validateInput(input, validate, errors) {
        this.resetErrorMessage(input);
        try {
            validate(input);
            return errors;
        } catch (error) {
            this.displayErrorMessage(input, error);
            errors++;
            return errors;
        }
    }

    /**
     * This function adds event listener on "change" to specified input's to validate it
     * @param {HTMLElement} input
     * @param {Function} validateFunction
     */
    addListenerOnChange(input, validateFunction) {
        input.addEventListener("change", (event) => {
            event.preventDefault()
            this.validateInput(input, validateFunction)
        })
    }

    submitContactForm() {
        let errors = 0

        errors = this.validateInput(this.$firstName, this.validateFirstName, errors)
        errors = this.validateInput(this.$lastName, this.validateLastName, errors)
        errors = this.validateInput(this.$email, this.validateEmail, errors)
        errors = this.validateInput(this.$message, this.validateMessage, errors)

        this.$closeModal.focus()

        // if no errors, send the form
        if (errors === 0) {
            this.$contactForm.submit();
        }
    }

    // display success message if form has been send
    displaySuccessMessage() {

        // check if form has been send
        const urlSearchParams = new URL(document.location).searchParams
        const userFirstName = urlSearchParams.get("firstname")

        if (userFirstName) {
            this.displayModal()
            this.$contactForm.style.display = "none"
            const $successMessage = document.createElement('p')
            $successMessage.classList.add('success-message')
            $successMessage.innerText = `Votre message a été envoyé avec succès !`
            this.$dialog.append($successMessage)
        }
    }

    // general function to call
    runContactForm() {

        // Add event listener to close modal when escape
        this.ModalControl.closeModalOnEscape()

        // open modal
        this.$contactButton.addEventListener("click", () => {
            this.displayModal()
        })

        // close modal
        this.$closeModal.addEventListener("click", () => {
            this.closeModal()
        })

        // check and display error messages on change
        this.addListenerOnChange(this.$firstName, this.validateFirstName)
        this.addListenerOnChange(this.$lastName, this.validateLastName)
        this.addListenerOnChange(this.$email, this.validateEmail)
        this.addListenerOnChange(this.$message, this.validateMessage)

        // check and display error messages / submit on submit
        this.$submit.addEventListener("click", (event) => {
            event.preventDefault()
            this.submitContactForm()
        })

        // if form has been send display success message
        this.displaySuccessMessage()
    }


}
