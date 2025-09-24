import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { reviewService } from '../services/review.service.js'
import { Link, useParams } from 'react-router-dom'
import { Chat } from '../cmps/Chat.jsx'
import { PopUp } from '../cmps/PopUp.jsx'

import { loadReviews,removeReview,addReview} from '../store/actions/review.actions.js'
import { useSelector } from 'react-redux'

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const [isOpen, setIsOpen] = useState(false)


  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
  // const user = useSelector((storeState)=>storeState.userModule.loggedInUser)
  
  useEffect(() => {
    if (toyId) loadToy()
     
  
  }, [toyId])

  useEffect(()=>{
 loadReviews() 
  },[])


  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err)
        navigate('/toy')
      })
  }

  
  function onSetIsOpen() {
    setIsOpen(true)
  }

  function onCloseChat() {
    setIsOpen(false)
  }

  if (!toy) return <div>Loading...</div>
  return (
    <section className="toy-details">
      <h1>Toy Name : {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
    {toy.msgs && 
        <section>
          Messages: 
          {toy.msgs.map((msg) => {
          return  <li key={msg.id}>{msg.txt}</li>
          })}
        </section>
       }

 {reviews && 
        <section>
          Reviews: 

          {reviews.map((review) => {  
          return  <li key={review._id}>{review.txt}
            <button onClick={()=>removeReview(review._id)}>x</button>
          </li>
          })}
        </section>
       }



<button onClick={()=>addReview(
  {txt:'Awesome!',
    aboutToyId:toyId
})

}>Add Review</button>
      <button className="chat-btn" onClick={onSetIsOpen}>
        chat
      </button>
             
      {isOpen && (
        <PopUp isOpen={isOpen} onCloseChat={onCloseChat}>
          <Chat />
        </PopUp>
      )}
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      <Link to={`/toy`}>Back</Link>
      <p>
        <Link to="/toy/nJ5L4">Next Toy</Link>
      </p>
    </section>
  )
}
