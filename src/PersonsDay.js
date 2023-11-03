import './App.css';
import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

// ["Member","Work Email","Group","Shift Start Date","Shift Start Time","Shift End Date","Shift End Time","Theme Color","Custom Label","Unpaid Break (minutes)","Notes","Shared"],

function timeAddMinutes(time, min) {
  var t = time.split(":"),      // convert to array [hh, mm, ss]
      h = Number(t[0]),         // get hours
      m = Number(t[1]);         // get minutes
  m+= min % 60;                 // increment minutes
  h+= Math.floor(min/60);       // increment hours
  if (m >= 60) { h++; m-=60 }   // if resulting minues > 60 then increment hours and balance as minutes
  
  return (h+"").padStart(2,"0")  +":"  //create string padded with zeros for HH and MM
         +(m+"").padStart(2,"0")       // original seconds unchanged
} 

function PersonsDay({index, dayName, shifts, staff, monday, group}) {


  //console.log(shifts.length)
  //console.log(shiftsArray)

  // console.log("index", index)
  // console.log("dayName", dayName)
  // console.log("shiftNames", shiftNames)
  // console.log("shiftStartTimes", shiftStartTimes)
  // console.log("shiftBreakStartTimes", shiftBreakStartTimes)


  const [shift, setshift] = useState('');
  let teamsCsv = []

  useEffect(() => { 

    
  },[]);

  const setShift = (event) => {  //event.target.value

    teamsCsv = JSON.parse(localStorage.getItem('teamsCSV'))

    //make new shift 

    let tempArray = staff.split(',').reduce((acc, i) => i ? [...acc, i] : acc, [])
    tempArray[1] = tempArray[1].slice(0, -1)
    tempArray.push(group[0])
    tempArray.push(monday.add(index, 'day').format('MM/DD/YYYY'))
    let startTime = event.target.value[2].slice(0, 2) + ":" + event.target.value[2].slice(2)
    tempArray.push(startTime)
    tempArray.push(monday.add(index, 'day').format('MM/DD/YYYY'))
    //tempArray.push((event.target.value[2].slice(0, 2).parseInt() + 8) + ":" + event.target.value[2].slice(2))
    tempArray.push((timeAddMinutes((startTime), (8*60))))
    tempArray.push(event.target.value[1])
    tempArray.push(event.target.value[0])
    tempArray.push('')
    tempArray.push(event.target.value[4])
    tempArray.push('2. Not Shared')

    //check if shift is already taken and remove

    let double = 0
    for (let i = 0; i < teamsCsv.length; i++) {
      if (teamsCsv[i][0] ===  tempArray[0] & teamsCsv[i][3] === tempArray[3]) {
        double = 1
        teamsCsv[i] = tempArray
        break
      }
    }
    if (double === 0) {
      teamsCsv.push(tempArray)
    }

    

    for (let i = 0; i < teamsCsv.length; i++) {
      if (teamsCsv[i][8] ===  'none') {
        teamsCsv.splice(i,1)
      }
    }

    localStorage.setItem('teamsCSV', JSON.stringify(teamsCsv))
    //console.log(JSON.parse(localStorage.getItem('teamsCSV')))
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
          defaultValue = ""
        >
          {shifts.map((shiftname, index) => (
            <MenuItem key={shiftname + index} value={shiftname}>
              {shiftname[0] + " " + shiftname[3]} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
    </Box>
  );
}

export default PersonsDay;
