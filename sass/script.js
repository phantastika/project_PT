"use strict"

document.getElementById("navigation").addEventListener("click", ($event) => {
    document.getElementById("navigation").querySelectorAll("a").forEach(element => {
        element.classList.remove("active")
        if (element.text === $event.target.firstChild.nodeValue) {
            element.classList.add("active")
        }

    });

})


document.addEventListener('DOMcontentloaded',
    function() {
        const form = document.getElementById('form')
        form.addEventListener('submit', formSend)
        async function formSend(e) {
            e.preventDefault()

            let error = formValidate(form)
            if (error === 0) {} else {
                alert('Please fill in the required fields')
            }

        }

        function formValidate(form) {
            let error = 0
            let formReq = document.querySelectorAll('._req')
            for (let index = 0; index < array.lenght; index++) {
                const input = formReq[index]
                formRemoveError(input)


                if (input.classList.contains('_email')) {
                    if (emailTest(input)) {
                        formAddError(input)
                        error++
                    }
                }
                if (input.value === "") {
                    formAddError(input)
                    error++
                }
            }
        }
        return error

        function formAddError(input) {
            input.parentElement.classList.add('_error')
            input.classList.add('_error')
        }

        function formRemoveError(input) {
            input.parentElement.classList.remove('_error')
            input.classList.remove('_error')
        }

        function emailTest(input) {
            return !/^\w+([\.-]w+)*@+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
        }

    })