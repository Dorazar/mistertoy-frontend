import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service-local.js'
import { Link, useParams } from 'react-router-dom'
import { Chat } from '../cmps/Chat.jsx'

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .get(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err)
        navigate('/toy')
      })
  }

  function onSetShowModal() {
    setShowModal((prevStatus) => !prevStatus)
  }

  function Popup({children}) {
    return (
      <section className="popup">
        <header>header</header>
        <main>{children}</main>
        <footer>footer</footer>
      </section>
    )
  }
  window.showModal = showModal
  if (!toy) return <div>Loading...</div>
  return (
    <section className="toy-details">
      <h1>Toy Name : {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      <button onClick={onSetShowModal}>chat</button>
      {showModal ? <Popup>
        <Chat></Chat>
      </Popup> : ''}
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      <Link to={`/toy`}>Back</Link>
      <p>
        <Link to="/toy/nJ5L4">Next Toy</Link>
      </p>
    </section>
  )
}
