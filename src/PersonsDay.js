import './App.css';
import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';



function PersonsDay({index, dayName ,shiftNames, shiftStartTimes, shiftBreakStartTimes}) {

  // console.log("index", index)
  // console.log("dayName", dayName)
  // console.log("shiftNames", shiftNames)
  // console.log("shiftStartTimes", shiftStartTimes)
  // console.log("shiftBreakStartTimes", shiftBreakStartTimes)


  const [shift, setshift] = useState('');
  useEffect(() => { 
  },[]);

  const setShift = () => {

  }

  return (
    <Box key={"personsday" + dayName + index}
        sx={{ border: 1 }}
    >
      <Box
        sx={{ margin: 1 }}
      >
        {dayName}
      </Box>
      <FormControl sx={{ m: 1, minWidth: 170 }}>
        <InputLabel id="Shift">Shift</InputLabel>
        <Select
          labelId="Shift"
          id="Shift"
          label="Age"
          onChange={setShift}
        >
          {shiftNames.map((shift, index) => (
            <MenuItem key={index} value={shift}>
              {shift}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
    </Box>
  );
}

export default PersonsDay;
