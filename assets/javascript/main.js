//show hidden password
const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye)

    iconEye.addEventListener('click', () => {
        //change password to text
        if (input.type === 'password') {
            //switch to text
            input.type = 'text'

            //icon change
            iconEye.classList.add('ri-eye-line')
            iconEye.classList.remove('ri-eye-off-line')
        } else {
            input.type = 'password'

            iconEye.classList.remove('ri-eye-line')
            iconEye.classList.add('ri-eye-off-line')
        }
    })
}

showHiddenPass('login-password', 'login-eye')
showHiddenPass('register-password', 'login-eye-1')
showHiddenPass('register-password-confirm', 'login-eye-2')


const loginForm = document.getElementById('login-form'),
    registerForm = document.getElementById('register-form'),
    forgotForm = document.getElementById('forget-form')


const changeForm = (selectedButton) => {
    const sButton = document.getElementById(selectedButton)

    sButton.addEventListener('click', () => {

        loginForm.classList.add('hide')
        registerForm.classList.add('hide')
        forgotForm.classList.add('hide')

        if (selectedButton === 'login-register') {
            registerForm.classList.remove('hide')
        } else if ((selectedButton === 'register-login') || (selectedButton === 'forget-cancel-button')) {
            loginForm.classList.remove('hide')
            document.getElementById('forget-email').value = ' '
        } else if (selectedButton === 'forgot-password') {
            forgotForm.classList.remove('hide')
        }
    })
}

changeForm('login-register')
changeForm('register-login')
changeForm('forget-cancel-button')
changeForm('forgot-password')


const savedEmail = localStorage.getItem("loginEmail"),
    savedPassword = localStorage.getItem("loginPassword")

document.getElementById('login-email').value = savedEmail
document.getElementById('login-password').value = savedPassword

const loginButton = () => {

    const loginEmail = document.getElementById('login-email').value,
        loginPassword = document.getElementById('login-password').value,
        loginRemember = document.getElementById('login-remember')

    if (loginRemember.checked) {
        //save to device if select remember
        localStorage.setItem("loginEmail", loginEmail)
        localStorage.setItem("loginPassword", loginPassword)
    } else {
        localStorage.setItem("loginEmail", "")
        localStorage.setItem("loginPassword", "")
    }

    //function to pass email and password to databaes
}

//store email and password