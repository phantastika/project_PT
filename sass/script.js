"use strict"

document.getElementById("navigation").addEventListener("click", ($event) => {
    document.getElementById("navigation").querySelectorAll("a").forEach(element => {
        element.classList.remove("active")
        if (element.text === $event.target.firstChild.nodeValue) {
            element.classList.add("active")
        }

    });

})

document.addEventListener("DOMContentLoaded", function(event) {

    const form = document.getElementById('form')
    form.addEventListener('submit', formSend)

    async function formSend(formData) {

        formData.preventDefault()

        let hasReqFields = formValidate(form)
        if (hasReqFields === 0) {
            sendEmail(form)
        } else {
            // alert('Please fill in the required fields')
            openError()
        }

    }

    function formValidate(form) {
        let error = 0
        let formReq = document.querySelectorAll('._req')


        for (let i = 0; i < formReq.length; i++) {

            const input = formReq[i]
            formRemoveError(input)

            if (input.classList.contains('_email')) {
                if (!emailTest(input)) {
                    formAddError(input)
                    error++
                }
            }

            if (input.value === "") {
                formAddError(input)
                error++
            }
        }
        return error
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
    }

    function emailTest(input) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return input.value.match(validRegex)
    }

    function sendEmail(form) {
        // generate a five digit number for the contact_number variable
        form.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm('service_3tx03ij', 'template_mmtbrog', form)
            .then(function() {
                console.log('SUCCESS!');
                openModal()
                document.getElementById('form').reset();

            }, function(error) {

                console.log('FAILED...', error);
            });
    }




})

function openModal() {
    let succesModal = new bootstrap.Modal(document.getElementById('succesModal'), {
        keyboard: false
    });

    succesModal.show();
}

function openError() {
    let UnSuccesModal = new bootstrap.Modal(document.getElementById('UnSuccesModal'), {
        keyboard: true
    });

    UnSuccesModal.show();
}

function hideBurgerMenu() {
    document.getElementById('menu-toggle').checked = false
}

document.getElementById('mobileLinks').querySelectorAll("a").forEach(element => {
    element.addEventListener("click", hideBurgerMenu)
})