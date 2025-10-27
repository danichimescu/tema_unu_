const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');

const signUpBtn = document.getElementById('registerSubmit');





// signUpBtn.addEventListener('click', () => createUser(userData.name, userData.firstName, userData.userName, userData.email, userData.phone, userData.password));

document.getElementById('registerFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();

// const name = document.getElementById("registerName").value.trim();
// const firstName = document.getElementById("registerFirstName").value.trim();
// const userName = document.getElementById("registerUserName").value.trim();
// const email = document.getElementById("registerEmail").value.trim();
// const phone = document.getElementById("registerPhone").value.trim();
// const password = document.getElementById("registerPassword").value.trim();
    // console.log("Name:", name);
    // console.log("First Name:", firstName);
    // console.log("User Name:", userName);
    // console.log("Email:", email);
    // console.log("Phone:", phone);
    // console.log("Password:", password);

const userData = {
    name: document.getElementById('registerName').value.trim(),
    firstName: document.getElementById('registerFirstName').value.trim(),
    userName: document.getElementById('registerUserName').value.trim(),
    email: document.getElementById('registerEmail').value.trim(),
    phone: document.getElementById('registerPhone').value.trim(),
    password: document.getElementById('registerPassword').value.trim()
};
    // console.log("Name2:", userData.name);
    // console.log("First2 Name:", userData.firstName);
    // console.log("User2 Name:", userData.userName);
    // console.log("Email2:", userData.email);
    // console.log("Phone2:", userData.phone);
    // console.log("Password2:", userData.password);

    
    createUser(userData)


});

document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUserName').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    logIn(username, password);

});


// Toggle between login and registration forms
showRegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    hideMessage();
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    hideMessage();
});


// cristian's functions
function createUser(userData) {
    if (validateUser(userData.email)) {
        const newUser = {
            name: userData.name,
            firstName: userData.firstName,
            userName: userData.userName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            id: crypto.randomUUID().slice(0, 8)
        }

        fetch("http://127.0.0.1:3000/createUser", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: newUser
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    // loadLoginHTML();
                    // showPopup(data.message, data.status);
                    registerForm.classList.add('hidden');
                    loginForm.classList.remove('hidden');
                    document.getElementById('registerFormElement').reset();
                    hideMessage();
                    showMessage(data.message, 'success');
                } else {
                    // showPopup(data.message, data.status);
                    // showMessage(data.message, 'error');
                    showMessage(data.message, data.status);
                }
            })
            // .catch(error => alert('Error creating your account:' + error))
            .catch(error => showMessage('Error connecting to server', 'error'))

    }

}

function validateUser(email) {
    let valid;
    const regex = /\S+@\S+\.\S+/;
    console.log('email:', email);
    if (regex.test(email)) {
        valid = true;
    } else {
        showPopup('Invalid email. Please try again!', 'error')
        valid = false;
    }
    return valid;

}

function logIn(username, password) {
    console.log('Logging in with', username, password);
    fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.trim(),
                password: password.trim()
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showMessage(`Successfully logged in! Welcome ${data.user.firstName} ${data.user.name}`, 'success');
                document.getElementById('loginFormElement').reset();
                // sessionStorage.setItem("currentUser", JSON.stringify(data.user));
                // sessionStorage.setItem("currentPortfolio", JSON.stringify(data.portfolio));
                // window.location.href = "../dashboard/index.html";
            } else {
                showMessage(data.message, 'error');
                // showPopup("Wrong username or password", "error");
            }
        })
        // .catch(err => alert("Eroare la logare: " + err))
        .catch(err => showMessage('Error connecting to server at login', 'error'))

}

function showPopup(message, status) {
    const container = document.getElementById("popupContainer");

    const popup = document.createElement("div");
    popup.classList.add("popupMessage");
    popup.textContent = message;
    popup.classList.add(status)

    container.appendChild(popup);

    setTimeout(() => popup.classList.add("show"), 10);

    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 8000);

    const popups = container.querySelectorAll(".popupMessage");
    if (popups.length > 6) {
        popups[0].remove();
    }
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}

function hideMessage() {
    messageDiv.style.display = 'none';
}