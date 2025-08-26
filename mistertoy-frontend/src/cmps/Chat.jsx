import { useState } from 'react'

export function Chat() {
  const [messages, setMessages] = useState([])



  function onChatMessage() {
    const message = 'sure thing honey'

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages,{txt:message,sender:'system'}])
    
    }, 2000)
  }

  
  function handleSubmit(ev) {
    ev.preventDefault()
    const newMessage = ev.target['message'].value
    if (newMessage.length===0) return 
    setMessages((prevMessages) => [...prevMessages, {txt:newMessage,sender:'user'}])
    ev.target['message'].value=''
     onChatMessage()
  }

  return (
    
    <section className='chat-container'>
      <ul className='chat-messages'>
        {messages.map((message, id) => (
          <li key={id} className={`chat-message ${message.sender}`}><h2>{message.txt}</h2></li>
        ))}
      </ul>
        <form onSubmit={handleSubmit} className='chat-bottom'>
        <input type="text" name="message" id="message" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
   
    </section>

    
  )
}
