// const cors = require('cors');
// app.use(cors());


// function loginUser() {
//     const email = document.getElementById('email').value.trim();
//     const password = document.getElementById('password').value.trim();
//     const emailMessage = document.getElementsByClassName('Email_Message')[0];
//     const passwordMessage = document.getElementsByClassName('Password_Message')[0];

//     let isValid = true;

//     // Clear previous messages
//     emailMessage.innerText = "";
//     passwordMessage.innerText = "";

//     // Email validation
//     if (!email) {
//         emailMessage.style.color = '#d8000c';
//         emailMessage.innerText = "Email is required!";
//         isValid = false;
//     } else if (!validateEmail(email)) {
//         emailMessage.style.color = '#d8000c';
//         emailMessage.innerText = "Invalid email format!";
//         isValid = false;
//     }

//     // Password validation
//     if (!password) {
//         passwordMessage.style.color = '#d8000c';
//         passwordMessage.innerText = "Password is required!";
//         isValid = false;
//     } else if (password.length < 6) {
//         passwordMessage.style.color = '#d8000c';
//         passwordMessage.innerText = "Password must be at least 6 characters long!";
//         isValid = false;
//     }

//     if (!isValid) return;

//     // Prepare JSON payload
//     const jsonObj = {
//         email: email,
//         password: password
//     };

//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://127.0.0.1:4903/loginUser", true);
//     xhr.setRequestHeader("Content-Type", "application/json");

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             try {
//                 let response = JSON.parse(xhr.responseText);
//                 if (xhr.status === 200) {
//                     if (response.message === "User login successfully!") {
//                         Swal.fire({
//                             icon: 'success',
//                             title: 'Success',
//                             text: response.message,
//                             showConfirmButton: false,
//                             timer: 1500
//                         });
    
//                         setTimeout(() => {
//                             window.location.href = "/index.html"; // Correct path
//                         }, 1500);
//                     } else {
//                         Swal.fire({
//                             icon: 'error',
//                             title: 'Error',
//                             text: response.message
//                         });
//                     }
//                 } else {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Error',
//                         text: 'Failed to connect to the server'
//                     });
//                 }
//             } catch (error) {
//                 console.error("Invalid JSON response:", error);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Invalid server response'
//                 });
//             }
//         }
//     };

//     xhr.send(JSON.stringify(jsonObj));

// }

// setTimeout(() => {
//     document.getElementById('email').value = "";
//     document.getElementById('password').value = "";
//     emailMessage.innerText = "";
//     passwordMessage.innerText = "";
// }, 2000);

// function validateEmail(email) {
//     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
//     return re.test(email);
// }










function loginUser() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailMessage = document.getElementsByClassName('Email_Message')[0];
    const passwordMessage = document.getElementsByClassName('Password_Message')[0];

    let isValid = true;

    emailMessage.innerText = "";
    passwordMessage.innerText = "";

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


    const jsonObj = {
        email: email,
        password: password
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:4903/loginUser", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            try {
                let response = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.message,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setTimeout(() => {
                        window.location.href = "/todoList";
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message
                    });
                }
            } catch (error) {
                console.error("Invalid JSON response:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid server response'
                });
            }
        }
    };

    xhr.send(JSON.stringify(jsonObj));

    email.value=""
    password.value=""
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    return re.test(email);
}
