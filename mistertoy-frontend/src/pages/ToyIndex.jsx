// const { useState, useEffect } = React
// const { Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy} from '../store/actions/toy.actions.js'


export function ToyIndex() {

    const labels = useSelector((storeState) => storeState.toyModule.labels)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)


    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])
    
    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    // function onAddtoy() {
    //     const toyToSave = toyService.getRandomtoy()
    //     savetoy(toyToSave)
    //         .then((savedtoy) => {
    //             showSuccessMsg(`Toy added (id: ${savedtoy._id})`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot add toy')
    //         })
    // }
    
    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedtoy) => {
                showSuccessMsg(`Toy updated to price: $${savedtoy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    // function addToCart(toy) {
    //     dispatch({ type: ADD_TOY_TO_CART, toy })
    //     showSuccessMsg('Added to CART')
    // }

    return (
        <div>
            <h3>toys App</h3>
            <main>
                <button><Link to="/toy/edit">Add Toy</Link></button>
                {/* <button className='add-btn' onClick={onAddtoy}>Add Random Toy ⛐</button> */}
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} labels={labels}/>
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        // addTotoyt={addToCart}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}

