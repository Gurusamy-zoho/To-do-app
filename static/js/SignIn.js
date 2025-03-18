const sampleUser = {
    email: "test@gmail.com",  
    password: "123456"
};

function loginUser() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    if (!email || !password) {
        message.style.color = '#d8000c';
        message.innerText = "All fields are required!";
        return;
    }

    if (!validateEmail(email)) {
        message.style.color = '#d8000c';
        message.innerText = "Invalid email format!";
        return;
    }

    if (email === sampleUser.email && password === sampleUser.password) {
        message.style.color = '#4CAF50';
        message.innerText = "Login successful!";
        setTimeout(() => {
            window.location.href = "welcome.html"; 
        }, 1500);
    } else {
        message.style.color = '#d8000c';
        message.innerText = "Invalid email or password!";
    }
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
    return re.test(email);
}