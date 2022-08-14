"use strict"

document.addEventListener("DOMContentLoaded", function(event) {

    document.getElementById("navigation").addEventListener("click", ($event) => {
        document.getElementById("navigation").querySelectorAll("a").forEach(element => {
            element.classList.remove("active")
            if (element.text === $event.target.firstChild.nodeValue) {
                element.classList.add("active")
            }
        });
    })

    document.getElementById('mobileLinks').querySelectorAll("a").forEach(element => {
        element.addEventListener("click", hideBurgerMenu)
    })

    let mybutton = document.getElementById("topBtn");
    window.onscroll = function() { scrollFunction() };

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

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

})

function openModal() {
    let succesModal = new bootstrap.Modal(document.getElementById('succesModal'), {
        keyboard: false
    });

    succesModal.show();
}

function openError() {
    let unSuccesModal = new bootstrap.Modal(document.getElementById('unSuccesModal'), {
        keyboard: true
    });

    unSuccesModal.show();
}

function hideBurgerMenu() {
    document.getElementById('menu-toggle').checked = false
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}