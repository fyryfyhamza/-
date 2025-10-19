const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message');

chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message === "") return;

    // عرض رسالة المستخدم
    appendMessage(message, 'user');

    // إرسال الرسالة إلى الباك إند
    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        appendMessage(data.reply, 'bot');
    });

    messageInput.value = '';
});

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
