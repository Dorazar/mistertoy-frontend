import { useState } from 'react'

export function Chat() {
  const [messages, setMessages] = useState([])

  function onChatMessage() {
    const message = 'Support:sure thing honey'
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, message])
    }, 2000)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const newMessage = ev.target['message'].value
    if (newMessage.length===0) return
    setMessages((prevMessages) => [...prevMessages, newMessage])
    ev.target['message'].value=''
    onChatMessage()
  }

  return (
    
    <section >
      
      <ul >
        {messages.map((message, id) => (
          <li key={id}>{message}</li>
        ))}
      </ul>
        <form onSubmit={handleSubmit}>
        <input type="text" name="message" id="message" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
   
    </section>

    
  )
}
