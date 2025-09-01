// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { useSelector } from 'react-redux'

import SelectComponent from './SelectComponent.jsx'
import {InputLabel,Box,TextField,MenuItem,FormControl,Select, FormControlLabel, FormLabel, RadioGroup, Radio} from '@mui/material'

export function ToyFilter({ filterBy, onSetFilter, labels }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
    // console.log(filterByToEdit.labels)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target

    if (type === 'select-multiple') {
      value = [...target.selectedOptions].map((option) => option.value)
    } else {
      value = type === 'number' ? +value : value
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  window.filterByToEdit = filterByToEdit

  return (
    <section className="toy-filter full main-layout">
      <form className="toy-filters">
        <Box sx={{ width: '300px' }} noValidate autoComplete="off">
          <TextField
            sx={{ width: '300px' }}
            name="name"
            id="name"
            label="🔎Toy name"
            value={filterByToEdit.name}
            onChange={handleChange}
          />
        </Box>

        <div>
          <Box sx={{ width: '200px' }}>
            <FormControl fullWidth>
              <InputLabel id="inStock">In stock</InputLabel>
              <Select name="inStock" labelId="inStock" id="inStock" label="In stock" value={filterByToEdit.inStock} onChange={handleChange}>
                <MenuItem value={''}>All</MenuItem>
                <MenuItem value={'true'}>In stock</MenuItem>
                <MenuItem value={'false'}>Out of stock</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

   

        <Box sx={{ width: '200px' }}>
          <FormControl fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select name="sortBy" labelId="sortBy" id="sortBy" label="In sortBy" value={filterByToEdit.sortBy} onChange={handleChange}>
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'price'}>Price</MenuItem>
              <MenuItem value={'createdAt'}>Created at</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <SelectComponent labels={labels} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />


          <FormControl>
      <FormLabel id="sortDir"></FormLabel>
      <RadioGroup
        aria-labelledby="sortDir"
        name="sortDir"
        value={filterByToEdit.sortDir}
        onChange={handleChange}
      >
        <FormControlLabel  value="Asc" control={<Radio />} label="Asc" />
        <FormControlLabel  value="Desc" control={<Radio />} label="Desc" />
      </RadioGroup>
    </FormControl>



        {/*         
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Toy name"
          value={filterByToEdit.name}
          onChange={handleChange}
        />
       */}

        {/* 

        <label htmlFor="inStock">In stock</label>
        <select onChange={handleChange} name="inStock" id="inStock">
          <option value="">All</option>
          <option value="true">In stock</option>
          <option value="false">Out of stock</option>
        </select>
 */}

        {/* <label htmlFor="sortBy">Sort by</label>
        <select onChange={handleChange} name="sortBy" id="sortBy">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created at</option>
        </select> */}


             {/* <span>
          <label htmlFor="sortDir"></label>
          <select onChange={handleChange} name="sortDir" id="sortDir">
            <option value="Asc">Asc</option>
            <option value="Desc">Desc</option>
          </select>
        </span> */}

        {/* <select name="labels" id="labels" multiple onChange={handleChange}>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select> */}
      </form>
    </section>
  )
}
