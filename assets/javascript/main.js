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
        alert('Login data will be sent to database. Your device will now remember your login information. Refresh page to see result.');

        //clear fields
        clearForms();
    } else {
        localStorage.setItem("loginEmail", "");
        localStorage.setItem("loginPassword", "");
        alert("Login data will be sent to database.");
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

    passwordConfirmation()

    const check = (list) => {
        const setItem = new Set(list);
        return setItem.size <= 1;
    }

    if (check(errorCheck)) {
        register(registerFirstName, registerLastName, registerEmail, registerPassword);


        var seconds = 10
            //make code show updated time count down
        document.getElementById("password-match-error").innerHTML = "Thank you for registering. Please follow the instructions in your email to verify your account. You will be redirected to the login page in " + seconds + " seconds.";

        var refreshIntervalID = setInterval(function() {
            seconds -= 1
            document.getElementById("password-match-error").innerHTML = "Thank you for registering. Please follow the instructions in your email to verify your account. You will be redirected to the login page in " + seconds + " seconds.";

            if (seconds < 0) {
                //go back to login
                clearForms()
                document.getElementById("login-form").classList.remove("hide");
                document.getElementById("register-form").classList.add("hide");
                document.getElementById("password-match-error").innerHTML = ''
                clearInterval(refreshIntervalID)
            }
        }, 1000)

    } else {
        var anyErrors = ""
        for (i = 0; i < errorCheck.length; i++) {
            if (errorCheck[i] === "") {
                anyErrors += errorCheck[i]
            } else {
                anyErrors += errorCheck[i]
                anyErrors += "<br>"
            }
        }
        document.getElementById("password-match-error").innerHTML = anyErrors

    }
};
const register = (firstName, LastName, email, password) => {};




const resetButton = () => {
    const forgetEmail = document.getElementById("forget-email").value;

    document.getElementById("forget-confirmation").innerHTML = "If your email is in our system, we will send a reset link to " + forgetEmail + ". Please read the email and for instructions to complete your password reset.";

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
    emailExp = /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9 ]{0,}$/i,
    numberExp = /[0-9]/,
    characterExp = /[^a-zA-Z0-9]/,
    lowerExp = /[a-z]/,
    upperExp = /[A-Z]/,
    errorCheck = [];

const statusColor = document.getElementById('password-status')

const firstName = () => {
        const firstName = document.getElementById("register-first-name").value;

        if (firstName.match(alphaExp)) {
            // firstName.classList.add('weak')
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck.splice(0, 1, "")
        } else {
            document.getElementById("password-match-error").innerHTML = "First Name format is incorrect!";
            errorCheck.splice(0, 1, "First Name format is incorrect!")
        }
    },
    lastName = () => {
        const lastName = document.getElementById("register-last-name").value;
        if (lastName.match(alphaExp)) {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck.splice(1, 1, "")
        } else {
            document.getElementById("password-match-error").innerHTML = "Last Name format is incorrect!";
            errorCheck.splice(1, 1, "Last Name format is incorrect!")
        }
    },
    email = () => {
        const email = document.getElementById("register-email").value;
        if (email.match(emailExp)) {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck.splice(2, 1, "")
        } else {
            document.getElementById("password-match-error").innerHTML = "Email format is incorrect!";
            errorCheck.splice(2, 1, "Email format is incorrect!")
        }
    },
    password = () => {
        const password = document.getElementById("register-password").value;
        var strength = 0


        if (password.length > 7) {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck.splice(3, 1, "")
            strength += password.length
        } else {
            document.getElementById("password-match-error").innerHTML = "Password Requires 8 Characters min.<br>";
            errorCheck.splice(3, 1, "Password Requires 8 Characters min.")
            strength += password.length
        }

        if (password.match(numberExp)) {
            document.getElementById("password-match-error").innerHTML += "";
            errorCheck.splice(4, 1, "")
            strength += 5
        } else {
            document.getElementById("password-match-error").innerHTML += "Password requires numeric character.<br>";
            errorCheck.splice(4, 1, "Password requires numeric character.")
        }

        if (password.match(lowerExp)) {
            document.getElementById("password-match-error").innerHTML += "";
            errorCheck.splice(5, 1, "")
            strength += 5
        } else {
            document.getElementById("password-match-error").innerHTML += "Password requires a lower case character.<br>";
            errorCheck.splice(5, 1, "Password requires a lower case character.")

        }
        if (password.match(upperExp)) {
            document.getElementById("password-match-error").innerHTML += "";
            errorCheck.splice(6, 1, "")
            strength += 5
        } else {
            document.getElementById("password-match-error").innerHTML += "Password requires a upper case character.<br>";
            errorCheck.splice(6, 1, "Password requires a upper case character.")
        }

        //check how strong password is

        if (password.match(characterExp)) {
            document.getElementById("password-match-error").innerHTML += "";
            errorCheck.splice(7, 1, "")
            strength += 5
        } else {
            document.getElementById("password-match-error").innerHTML += "Password requires a special character.<br>";
            errorCheck.splice(7, 1, "Password requires a special character.")
        }



        if ((strength > 0) && (strength < (password.length + 9))) {
            //weak color
            statusColor.classList.add('weak')
        } else {
            statusColor.classList.remove('weak')
        }

        if (strength >= (password.length + 10)) {
            //medium weak color
            statusColor.classList.add('medium-weak')
        } else {
            statusColor.classList.remove('medium-weak')
        }

        if (strength >= (password.length + 15)) {
            //medium strong color
            statusColor.classList.add('medium-strong')
        } else {
            statusColor.classList.remove('medium-strong')
        }

        if (strength >= (password.length + 20)) {
            //strong color
            statusColor.classList.add('strong')
        } else {
            statusColor.classList.remove('strong')
        }


    },
    passwordConfirmation = () => {
        const password = document.getElementById("register-password").value,
            passwordConfirm = document.getElementById("register-password-confirm").value;

        //check
        if (passwordConfirm.length > 0) {
            if (passwordConfirm === password) {
                document.getElementById("password-match-error").innerHTML = "";
                errorCheck.splice(8, 1, "")
            } else {
                document.getElementById("password-match-error").innerHTML = "Passwords do not match!";
                errorCheck.splice(8, 1, "Passwords do not match!")
            }
        } else {
            document.getElementById("password-match-error").innerHTML = "";
            errorCheck.splice(8, 1, "")
        }
    },
    changeDefault = () => {
        statusColor.classList.remove('weak')
        statusColor.classList.remove('medium-weak')
        statusColor.classList.remove('medium-strong')
        statusColor.classList.remove('strong')
        statusColor.classList.add('default')
    }