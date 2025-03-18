function registerUser() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const nameMessage = document.getElementById('Name_message');
    const emailMessage = document.getElementById('Email_message');
    const passwordMessage = document.getElementById('Password_message');

    nameMessage.innerText = "";
    emailMessage.innerText = "";
    passwordMessage.innerText = "";

    let isValid = true;

    if (!name) {
        nameMessage.style.color = '#d8000c';
        nameMessage.innerText = "Name is required!";
        isValid = false;
    }

    if (!email) {
        emailMessage.style.color = '#d8000c';
        emailMessage.innerText = "Email is required!";
        isValid = false;
    } else if (!validateEmail(email)) {
        emailMessage.style.color = '#d8000c';
        emailMessage.innerText = "Invalid email format!";
        isValid = false;
    }

    if (!password) {
        passwordMessage.style.color = '#d8000c';
        passwordMessage.innerText = "Password is required!";
        isValid = false;
    } else if (password.length < 6) {
        passwordMessage.style.color = '#d8000c';
        passwordMessage.innerText = "Password must be at least 6 characters long!";
        isValid = false;
    }

    if (!isValid) return;

    let jsonObj = {
        "name": name,
        "email": email,
        "password": password
    };


    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:4903/addUser", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                if (response[0].message === "User added successfully!") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response[0].message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response[0].message
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to connect to the server'
                });
            }
        }
    };

    xhr.send(JSON.stringify(jsonObj));

    setTimeout(() => {
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        nameMessage.innerText = "";
        emailMessage.innerText = "";
        passwordMessage.innerText = "";
    }, 2000);
}


function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
    return regex.test(email);
}
