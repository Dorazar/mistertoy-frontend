import { useEffect } from 'react'

export function PopUp({ children, isOpen, onCloseChat }) {

  if (!isOpen) return

  useEffect(() => {
    document.body.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        onCloseChat()
      }
    })
    return () => {
      document.body.removeEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') {
          onCloseChat()
        }
      })
      console.log('Clean up function running')
    }
  }, [])



  return (
    <section className="popup-container">
      <header><h1>Chat</h1></header>
      {children}
      <footer><h1>Toy chat</h1></footer>
    </section>
  )
}
