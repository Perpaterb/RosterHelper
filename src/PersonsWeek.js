import './App.css';
import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import PersonsDay from './PersonsDay'
import Grid from '@mui/material/Grid';



function PersonsWeek({index, staffName, shiftNames, shiftStartTimes, shiftBreakStartTimes}) {

    // console.log("index", index)    
    // console.log("shiftNames", shiftNames)
    // console.log("shiftStartTimes", shiftStartTimes)
    // console.log("shiftBreakStartTimes", shiftBreakStartTimes)
//   const [dataFromApp, setdataFromApp] = useState(staffnames);

//   useEffect(() => { 
//   },[]);

//   const setShift = () => {
//   }

  let day = ["Monday", "Tusday", "Wednessday", "Thurday", "Friday", "Saturday", "Sunday"]



  return (
    <Box
        sx={{ 
            border: 1,
            padding: 1,
            margin:1,
        }}
    >
        <Box
            key={"personweek" + index}
            sx={{ 
                Width: '80%'
            }}
        >
            <Grid sx={{ flexGrow: 1}} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={0}>
                        <Box
                            sx={{ 
                                margin: 1,
                                width: 220,
                             }}
                        >
                            {staffName}
                        </Box>
                        {day.map((dayName, i) => (
                            <PersonsDay
                                index={i}
                                dayName={dayName}
                                shiftNames={shiftNames}
                                shiftStartTimes={shiftStartTimes}
                                shiftBreakStartTimes={shiftBreakStartTimes}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </Box>
  );
}

export default PersonsWeek;
