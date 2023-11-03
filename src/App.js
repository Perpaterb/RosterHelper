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



function getTeamsCSVFile() {
  //console.log(JSON.parse(localStorage.getItem('teamsCSV')))
  return (JSON.parse(localStorage.getItem('teamsCSV'))) 
} 


function App() {
  let teamsCSV = [
    ["Member","Work Email","Group","Shift Start Date","Shift Start Time","Shift End Date","Shift End Time","Theme Color","Custom Label","Unpaid Break (minutes)","Notes","Shared"]
  ]

  let defaultFeed = "Staff {[Matthew Michael,matthew.michael@uts.edu.au],[Andrew Strange,andrew.strange@uts.edu.au],[Andrew Voraboud,andrew.voraboud@uts.edu.au],[Angela Joshi,angela.joshi@uts.edu.au],[Connie Chen,connie.chen@uts.edu.au],[Falak Patel,falak.patel@uts.edu.au],[Michael Phan,michael.phan@uts.edu.au],[Nadeem Mohammed,nadeem.mohammed@uts.edu.au],[Philip Lam,philip.lam@uts.edu.au],[Robert Snars,robert.snars@uts.edu.au],[Zac Illingworth,zac.illingworth@uts.edu.au],[Nikhil Chowdary Dirisala,nikhil.dirisala@uts.edu.au]} Group {ITSC}  Shifts {[Coordinator,1. White,0900,0000,ITSC Coordinator],[Off,1. White,0000,0000,],[Sick,1. White,0000,0000,],[Leave,3. Green,0000,0000,],[RDS,1. White,0000,0000,Working with RDS],[Training,1. White,0000,0000,],[8am UTS,2. Blue,0800,1130,Lunch 11:30am],[8am WHM,8. DarkBlue,0800,1130,Lunch 11:30am],[9am UTS,4. Purple,0900,1230,Lunch 12:30pm],[9am UTS,5. Pink,0900,1330,Lunch 1:30pm],[9am WFH,10. DarkPurple,0900,1230,Lunch 12:30pm],[9am WFH,11. DarkPink,0900,1330,Lunch 1:30pm],[Counter,6. Yellow,0900,1230,Lunch 12:30pm],[10am WFH,11. DarkPink,1000,1430,Lunch 2:30pm],[11am WFH,11. DarkPink,1100,1530,Lunch 3:30pm],[1:30pm WFH,12. DarkYellow,1330,1600,Lunch 4:00pm]}"
  const [feedData, setFeedData] = useState('');
  const [staff, setStaff] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [group, setGroup] = useState([]);
  const [monday, setMonday] = useState(dayjs());
  const [teamsData, setTeamsData] = useState('');

  const [errorInFeed, setErroInFeed] = useState(false);

  useEffect(() => { 
    if (localStorage.getItem('FeedData') === undefined) {
      setFeedData(defaultFeed)
      updateTable()
    } else {
      setFeedData(localStorage.getItem('FeedData'))
      updateTable()
    } 
    localStorage.setItem('teamsCSV', JSON.stringify(teamsCSV))
  },[]);




  function updateTable() {
    let errorcheck = false

    if (localStorage.getItem('FeedData').split("}").length !== 4) {
      setErroInFeed(true)
      errorcheck = true
    }
    if (localStorage.getItem('FeedData').split("{").length !== 4) {
      setErroInFeed(true)
      errorcheck = true
    }
    if (errorcheck === false) {
      setErroInFeed(false)

      let tempArray = []
      let feedtemp = localStorage.getItem('FeedData')
      for (let i = 1; i < feedtemp.split("}")[0].split("{")[1].split("[").length; i++) {
        tempArray[i] = feedtemp.split("}")[0].split("{")[1].split("[")[i]
      }
      setStaff(tempArray)

      //console.log(tempArray)


    
      tempArray = []
      for (let i = 0; i < feedtemp.split("}")[1].split("{")[1].split(",").length; i++) {
        tempArray[i] = feedtemp.split("}")[1].split("{")[1].split(",")[i]
      }
      setGroup(tempArray)
      
    
      tempArray = []
      for (let i = 1; i < feedtemp.split("}")[2].split("{")[1].split("[").length; i++) {
        
        
        tempArray[i] = feedtemp.split("}")[2].split("{")[1].split("[")[i].split(",").reduce((acc, i) => i ? [...acc, i] : acc, [])
        tempArray[i][4] = tempArray[i][4].slice(0, -1)
        
      }
      tempArray.splice(0,0,['none','', '', '', ''])
      setShifts(tempArray)
    }



  }
  


  // useEffect(() => { 
  //   staffnames = feedData.split(",")[0]
  // },[feedData]);

  let downloadName = "Roster export " + moment().format('MMMM Do YYYY, h:mm:ss a') + ".csv" ;

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

  let helpNote = 'Staff {[Name,Email]} Group {group in teams} Shifts {[Name,Theme colour,Start time,Lunch start time,Note]}'

  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            width: 1300,
            maxWidth: '90%',
            height: 450,
          }}
        >
          Feed Data
          <p>{helpNote}</p>
          <TextField fullWidth multiline rows={12}
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
                      <DatePicker defaultValue={dayjs()} format="DD-MM-YYYY" onChange={(newValue) => setMonday(newValue)}/>
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                
                {staff.map((name, i) => (
                  <PersonsWeek 
                    index={i}
                    staff={staff}
                    shifts={shifts}
                    monday={monday}
                    group={group}
                    />
                ))}
        
                {/* <CSVLink data={getTeamsCSVFile()} filename={downloadName}> Export Teams Roster </CSVLink> */}
                <CSVLink data={teamsData} asyncOnClick={true} filename={downloadName}
                  onClick={(event, done) => {setTeamsData(JSON.parse(localStorage.getItem('teamsCSV'))); done(); }}  
                > Export Teams Roster </CSVLink>
                <Box
                    sx={{
                      height: 30,
                    }}
                  ></Box>
                
                <CSVLink data={JSON.parse(localStorage.getItem('teamsCSV'))} filename={downloadName}> Export Humanity Roster </CSVLink>
                <Box
                    sx={{
                      height: 30,
                    }}
                  ></Box>
              </Box>
            )
          }
        })()}
      </header>
    </div>
  );
}

export default App;
