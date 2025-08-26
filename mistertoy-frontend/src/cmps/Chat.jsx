import { useState } from 'react'

export function Chat() {
  const [messages, setMessages] = useState([])
  

  

  function handleSubmit(ev) {
    ev.preventDefault()
    console.log(ev.target["message"].value)
    setMessages((prevMessages) => ([...prevMessages,ev.target["message"].value]))
    
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="message" id="message" placeholder="Type a message..." />
      <button type="submit">Send</button>
    </form>
    <ul>

 {messages.map(
    (message,id) => 
    <li key={id}>
        {message}
    </li>
    )}
    </ul>
   


    </>
  )
}
