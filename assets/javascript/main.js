//show hidden password
const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye);

    iconEye.addEventListener("click", () => {

        //change password to text
        if (input.type === "password") {

            //switch to text
            input.type = "text";

            //icon change
            iconEye.classList.add("ri-eye-line");
            iconEye.classList.remove("ri-eye-off-line");
        } else {
            input.type = "password";
            iconEye.classList.remove("ri-eye-line");
            iconEye.classList.add("ri-eye-off-line");
        }
    });
};
showHiddenPass("login-password", "login-eye");
showHiddenPass("register-password", "login-eye-1"); //
showHiddenPass("register-password-confirm", "login-eye-2");




//change forms
const changeForm = (selectedButton) => {
    const loginForm = document.getElementById("login-form"),
        registerForm = document.getElementById("register-form"),
        forgotForm = document.getElementById("forget-form"),
        sButton = document.getElementById(selectedButton);

    sButton.addEventListener("click", () => {
        loginForm.classList.add("hide");
        registerForm.classList.add("hide");
        forgotForm.classList.add("hide");

        if (selectedButton === "login-register") {
            registerForm.classList.remove("hide");
            clearForms();
        } else if (
            selectedButton === "register-login" ||
            selectedButton === "forget-cancel-button"
        ) {
            loginForm.classList.remove("hide");
            clearForms();
            document.getElementById("forget-email").value = " ";
        } else if (selectedButton === "forgot-password") {
            forgotForm.classList.remove("hide");
            clearForms();
        }
    });
};
changeForm("login-register");
changeForm("register-login");
changeForm("forget-cancel-button");
changeForm("forgot-password");




const loginButton = () => {
    const loginEmail = document.getElementById("login-email").value,
        loginPassword = document.getElementById("login-password").value,
        loginRemember = document.getElementById("login-remember");

    if (loginRemember.checked) {
        //save to device if select remember
        localStorage.setItem("loginEmail", loginEmail);
        localStorage.setItem("loginPassword", loginPassword);
        alert("login confirmation message. Your device will now remember your login information. Refresh page to see result.");

        //clear fields
        clearForms();
    } else {
        localStorage.setItem("loginEmail", "");
        localStorage.setItem("loginPassword", "");
        alert("login confirmation message. ");
        clearForms();
    }

    //function to pass email and password to databaes
    login(loginEmail, loginPassword);
};
const login = (loginEmail, loginPassword) => {};




const registerButton = () => {
    const registerFirstName = document.getElementById("register-first-name").value,
        registerLastName = document.getElementById("register-last-name").value,
        registerEmail = document.getElementById("register-email").value,
        registerPassword = document.getElementById("register-password").value

    errorCheck = 0

    // firstName()
    // lastName()
    // email()
    // password()
    // passwordConfirmation()
    alert(errorCheck)

    // if (errorCheck < 1) {
    //     // document.getElementById('password-match-error').innerHTML = 'First Name format is incorrect!'


    //     register(registerFirstName, registerLastName, registerEmail, registerPassword);
    //     clearForms();
    // }
};
const register = (firstName, LastName, email, password) => {};




const resetButton = () => {
    const forgetEmail = document.getElementById("forget-email").value;

    document.getElementById("forget-confirmation").innerHTML =
        "If your email is in our system, we will send a reset link to " +
        forgetEmail +
        ". Please read the email and for instructions to complete your password reset.";

    //send email to database for confirmation
    reset(forgetEmail);
};
const reset = (forgetEmail) => {};




//utilities
const savedEmail = localStorage.getItem("loginEmail"),
    savedPassword = localStorage.getItem("loginPassword")

document.getElementById("login-email").value = savedEmail;
document.getElementById("login-password").value = savedPassword;

const clearForms = () => {
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("register-first-name").value = "";
    document.getElementById("register-last-name").value = "";
    document.getElementById("register-email").value = "";
    document.getElementById("register-password").value = "";
    document.getElementById("register-password-confirm").value = "";
    document.getElementById("forget-email").value = "";
    document.getElementById("forget-confirmation").innerHTML = "";
};


const alphaExp = /^[a-zA-Z ]+$/,
    emailExp =
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9 ]{0,}$/i,
    numberExp = /^[0-9]+$/,
    // characterExp = /^+$/,
    upperExp = /^[A-Z]+$/,
    errorCheck = 0;
const
    firstName = () => {
        const firstName = document.getElementById("register-first-name").value;

        if (firstName.match(alphaExp)) {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck -= 1
            alert(errorCheck)
        } else {
            document.getElementById("password-match-error").innerHTML = "First Name format is incorrect!";
            errorCheck += 1
        }
    },
    lastName = () => {
        const lastName = document.getElementById("register-last-name").value;
        if (lastName.match(alphaExp)) {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck -= 1
        } else {
            document.getElementById("password-match-error").innerHTML = "Last Name format is incorrect!";
            errorCheck += 1
        }
    },
    email = () => {
        const email = document.getElementById("register-email").value;
        if (email.match(emailExp)) {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck -= 1
        } else {
            document.getElementById("password-match-error").innerHTML =
                "Email format is incorrect!";
            errorCheck += 1
        }
    },
    password = () => {
        const password = document.getElementById("register-password").value;

        //check how strong password is
        if (password.length > 8) {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck -= 1
        } else {
            document.getElementById("password-match-error").innerHTML = "Password Requires a min of 8 Characters.";
            errorCheck += 1
        }
    },
    passwordConfirmation = () => {
        const password = document.getElementById("register-password").value,
            passwordConfirm = document.getElementById("register-password-confirm").value;

        //check
        if (passwordConfirm.length > 0) {
            if (passwordConfirm.match(password)) {
                document.getElementById("password-match-error").innerHTML = "";
                errorCheck -= 1
            } else {
                document.getElementById("password-match-error").innerHTML = "Passwords do not match!";
                errorCheck += 1
            }
        } else {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck -= 1
        }
    };