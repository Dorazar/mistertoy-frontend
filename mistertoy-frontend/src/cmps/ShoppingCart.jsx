// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { REMOVE_TOY_FROM_CART } from '../store/reducers/toy.reducer.js'

export function ShoppingCart({ isToytShown }) {
    const dispatch = useDispatch()
    const shoppingToyt = useSelector(storeState => storeState.toyModule.shoppingToyt)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)


    function removeFromToyt(toyId) {
        console.log(`Todo: remove: ${toyId} from toyt`)
        dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
    }

    function getToytTotal() {
        return shoppingToyt.reduce((acc, toy) => acc + toy.price, 0)
    }

    function onCheckout() {
        const amount = getToytTotal()
        // DONE: checkout function that dispatch
        checkout(amount)
            .then(()=>{
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(()=>{
                showErrorMsg('There was a problem checking out!')
            })
    }

    if (!isToytShown) return <span></span>
    const total = getToytTotal()
    return (
        <section className="toyt" >
            <h5>Your Toyt</h5>
            <ul>
                {
                    shoppingToyt.map((toy, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromToyt(toy._id)
                        }}>x</button>
                        {toy.vendor} | ${toy.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
