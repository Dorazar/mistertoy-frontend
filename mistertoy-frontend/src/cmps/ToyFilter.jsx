// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { useSelector } from 'react-redux'

export function ToyFilter({ filterBy, onSetFilter }) {
  const labels = useSelector((storeState) => storeState.toyModule.labels)

  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
    console.log(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target

  
     if (type === 'select-multiple') {
            value = [...target.selectedOptions].map(option => option.value)
        } else {
            value = type === 'number' ? +value : value
        }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Toy name"
          value={filterByToEdit.name}
          onChange={handleChange}
        />

        <label htmlFor="inStock">In stock</label>
        <select onChange={handleChange} name="inStock" id="inStock">
          <option value="">All</option>
          <option value="true">In stock</option>
          <option value="false">Out of stock</option>
        </select>

        <label htmlFor="sortBy">Sort by</label>
        <select onChange={handleChange} name="sortBy" id="sortBy">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created at</option>
        </select>

        <label htmlFor="sortDir"></label>
        <select onChange={handleChange} name="sortDir" id="sortDir">
          <option value="Asc">Asc</option>
          <option value="Desc">Desc</option>
        </select>

        <select name="labels" id="labels" multiple onChange={handleChange}>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </form>
    </section>
  )
}
