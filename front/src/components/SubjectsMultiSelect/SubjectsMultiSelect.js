import React from 'react'
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const SubjectsMultiSelect = ({name, subjects, values, setValues, error}) => {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    setValues(      
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <InputLabel id="demo-multiple-chip-label">Materias</InputLabel>
      <Select
        name={name}
        error={error}
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={values}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {subjects.map((subject) => (
          <MenuItem
            key={subject.id}
            value={subject.name}            
          >            
            {subject.name}
          </MenuItem>
        ))}
      </Select>  
    </>
  )
}

export default SubjectsMultiSelect
