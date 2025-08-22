// const { useState, useEffect } = React
// const { Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service-local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'


export function ToyIndex() {

    const dispatch = useDispatch()
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

    function onRemovetoy(toyId) {
        removetoyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddtoy() {
        const toyToSave = toyService.getRandomtoy()
        savetoy(toyToSave)
            .then((savedtoy) => {
                showSuccessMsg(`Toy added (id: ${savedtoy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }
    
    function onEdittoy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        savetoy(toyToSave)
            .then((savedtoy) => {
                showSuccessMsg(`Toy updated to price: $${savedtoy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function addTotoyt(toy) {
        console.log(`Adding ${toy.vendor} to toyt`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to toyt')
    }

    return (
        <div>
            <h3>toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <button className='add-btn' onClick={onAddtoy}>Add Random Toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemovetoy={onRemovetoy}
                        onEdittoy={onEdittoy}
                        addTotoyt={addTotoyt}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}

