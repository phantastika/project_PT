"use strict"

document.addEventListener('DOMcontentloaded', function() {
            const form = document.getElementById(contactform)
            form.addEventListener('submit', formSend)

            async function formSend(e) {
                e.preventDefault()

                let error = formValidate(form)
            }

            function formValidate(form) {
                let error = 0
                let formReq = document.querySelectorAll('_req')
                for (let index = 0; index < formReq.length; index++) {
                    const input = formReq[index]
                    formRemoveErrow(input)
                    if (input.classList.contains('_email')) {
                        if (emailTest(input)) {
                            formAddErrow(input)
                            error++
                        }
                    } else {
                        if (input.value === '') {
                            formAddErrow(input)
                            error++
                        }
                    }

                }
                return error


                function formAddErrow(input) {
                    input.parentElement.classList.add('_error')
                    input.classList.add('_error')
                }

                function formRemoveErrow(input) {
                    input.parentElement.classList.remove('_error')
                    input.classList.remove('_error')
                }

                function emailTest(input) {
                    return !/^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
                }
            }

        )