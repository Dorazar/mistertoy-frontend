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
    setMessages((prevMessages) => [...prevMessages, newMessage])
     onChatMessage()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" id="message" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, id) => (
          <li key={id}>{message}</li>
        ))}
      </ul>
    </>
  )
}
