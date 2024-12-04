// script.js

document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch('/api/users/profile', {
        method: 'PUT',
        body: formData,
    });

    if (response.ok) {
        const result = await response.json();
        alert(result.message);
    } else {
        alert('Error updating profile');
    }
});
// Handle Registration Form Submission
document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        alert('Registration failed!');
    }
});

// Handle Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        alert('Invalid credentials!');
    }
});

// WebSocket Connection for Chat
const socket = new WebSocket('ws://localhost:5000');

socket.onopen = () => {
    console.log('Connected to WebSocket');
};

socket.onmessage = (event) => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<p>${event.data}</p>`;
};

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    
    if (messageInput.value) {
        socket.send(messageInput.value);
        messageInput.value = ''; // Clear input field
    }
}
