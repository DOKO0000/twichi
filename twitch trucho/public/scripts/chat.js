export function initializeChat(chatContainer, messageInput) {
  if (typeof window !== 'undefined') {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL)
    
    socket.onopen = () => {
      console.log('Conectado al chat')
    }
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      const messageElement = document.createElement('div')
      messageElement.className = 'message'
      messageElement.innerHTML = `
        <strong>${message.username}</strong>: ${message.text}
        <small>${new Date(message.timestamp).toLocaleTimeString()}</small>
      `
      chatContainer.appendChild(messageElement)
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
    
    const sendButton = messageInput.nextElementSibling
    sendButton.onclick = () => {
      const message = {
        username: 'Usuario',
        text: messageInput.value
      }
      socket.send(JSON.stringify(message))
      messageInput.value = ''
    }
    
    messageInput.onkeypress = (e) => {
      if (e.key === 'Enter') {
        sendButton.click()
      }
    }
  }
}