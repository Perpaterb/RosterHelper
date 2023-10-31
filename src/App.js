import './App.css';
import React, { useState, useEffect} from 'react';
import { CSVLink } from "react-csv";
import moment from 'moment'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonsWeek from './PersonsWeek'





function App() {

  let defaultFeed = "Staff-Names {Andrew,Bob}, Shift-Names {RDO,Sick,Leave,9am 12:30L,9am 1:30L}, Shift-Start-times {0000,0000,0000,0900,0900}, Shift-Lunch-Break-Start-Times-HHMM {0000,0000,0000,1230,1330}"
  const [feedData, setFeedData] = useState('');
  const [staffNames, setStaffNames] = useState([]);
  const [shiftNames, setShiftNames] = useState([]);
  const [shiftStartTimes, setShiftStartTimes] = useState([]);
  const [shiftBreakStartTimes, setShiftBreakStartTimes] = useState([]);

  const [errorInFeed, setErroInFeed] = useState(false);

  useEffect(() => { 
    if (localStorage.getItem('FeedData') === undefined) {
      setFeedData(defaultFeed)
      updateTable()
    } else {
      setFeedData(localStorage.getItem('FeedData'))
      updateTable()
    } 
  },[]);


  function updateTable() {
    let errorcheck = false

    if (localStorage.getItem('FeedData').split("}").length !== 5) {
      setErroInFeed(true)
      errorcheck = true
    }
    if (localStorage.getItem('FeedData').split("{").length !== 5) {
      setErroInFeed(true)
      errorcheck = true
    }
    if (errorcheck === false) {

      let tempArray = []
      let feedtemp = localStorage.getItem('FeedData')
      for (let i = 0; i < feedtemp.split("}")[0].split("{")[1].split(",").length; i++) {
        tempArray[i] = feedtemp.split("}")[0].split("{")[1].split(",")[i]
      }
      setStaffNames(tempArray)
    
      tempArray = []
      for (let i = 0; i < feedtemp.split("}")[1].split("{")[1].split(",").length; i++) {
        shiftNames[i] = feedtemp.split("}")[1].split("{")[1].split(",")[i]
      }
      setShiftNames(tempArray)
    
      tempArray = []
      for (let i = 0; i < feedtemp.split("}")[2].split("{")[1].split(",").length; i++) {
        shiftStartTimes[i] = feedtemp.split("}")[2].split("{")[1].split(",")[i]
      }
      setShiftStartTimes(tempArray)
    
      tempArray = []
      for (let i = 0; i < feedtemp.split("}")[3].split("{")[1].split(",").length; i++) {
        shiftBreakStartTimes[i] = feedtemp.split("}")[3].split("{")[1].split(",")[i]
      }
      setShiftBreakStartTimes(tempArray)

    }
    // console.log("app staffnames", staffNames)
    // console.log("app shiftNames", shiftNames)
    // console.log("app shiftStartTimes", shiftStartTimes)
    // console.log("app shiftBreakStartTimes", shiftBreakStartTimes) 
  }
  


  // useEffect(() => { 
  //   staffnames = feedData.split(",")[0]
  // },[feedData]);

  let downloadName = "Roster export " + moment().format('MMMM Do YYYY, h:mm:ss a') + ".csv" ;
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
  

  const onChangeFeedData = (event) => {
    localStorage.setItem('FeedData', event.target.value)
  }

  const updateFeedData = (event) => {
    updateTable()
  }

  const resetFeedData = () => {
    setFeedData(defaultFeed)
    localStorage.setItem('FeedData', defaultFeed)
    updateTable()
  }

  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            width: 900,
            maxWidth: '90%',
            height: 330,
          }}
        >
          Feed Data
          <TextField fullWidth multiline rows={8}
            defaultValue={feedData}
            onChange={onChangeFeedData}
          />
          <Button variant="contained" href="#contained-buttons" onClick={resetFeedData}
            sx={{
              width: 130,
              maxWidth: '90%',
              height: 30,
            }}
          >
            Reset Feed 
          </Button>
          <Button variant="contained" href="#contained-buttons" onClick={updateFeedData}
            sx={{
              width: 200,
              maxWidth: '90%',
              height: 30,
              marginLeft: 1,
            }}
          >
            Update From Feed
          </Button>
        </Box>
        {(() => {
          if(errorInFeed){
            return (<p>Error in feed</p>)
          } else{
            console.log("staffNames", staffNames)
            return (
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      'DatePicker',
                    ]}
                  >
                    <p>Monday of the roster week :</p>
                    <DemoItem>
                      <DatePicker defaultValue={dayjs()} format="DD-MM-YYYY"/>
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                
                {staffNames.map((name, i) => (
                  <PersonsWeek 
                    index={i}
                    staffName={name}
                    shiftNames={shiftNames}
                    shiftStartTimes={shiftStartTimes}
                    shiftBreakStartTimes={shiftBreakStartTimes}
                    />
                ))}
        
                <CSVLink data={csvData} filename={downloadName}> Export Teams Roster </CSVLink>
                <Box
                      sx={{
                        height: 30,
                      }}
                    ></Box>
                <CSVLink data={csvData} filename={downloadName}> Export Humanity Roster </CSVLink>
              </Box>
            )
          }
        })()}
      </header>
    </div>
  );
}

export default App;
