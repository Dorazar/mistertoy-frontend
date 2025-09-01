
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { useEffect, useRef, useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export default function SelectComponent({ labels,filterByToEdit,setFilterByToEdit}) {
  
 const handleChange = (event) => {
    
    const {target: {value,name}} = event;
    setFilterByToEdit((prevfilter => ({...prevfilter,[name]: value})))
  };

 
// window.currentLabels = currentLabels
//   window.filterByToEdit=filterByToEdit

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="labels">Labels</InputLabel>
        <Select
          name="labels"
          labelId="labels"
          id="labels"
          multiple
          value={filterByToEdit.labels}
          onChange={handleChange}
          input={<OutlinedInput label="labels" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {labels.map((label) => (
            <MenuItem key={label} value={label}>
              <Checkbox checked={filterByToEdit.labels.includes(label)} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
