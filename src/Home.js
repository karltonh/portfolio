import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
//import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Route, Link , Routes} from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import BlackSkyBox from "./assets/02-34-11-741_512.gif";
import DevlogImage from "./images/devlogupdate.jpg";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


function Home() {
    const [date, setDate] = useState(new Date());
    function refreshClock() {
      setDate(new Date());

      
    }
    //when mouse hovers over link
    function MouseOverLink(event) {
      event.target.style.color = 'gray';
    }
    function MouseOverPanel(event){
      if(event.target.style.bg==="t"){
        event.target.style.width = "100%";
        event.target.style.height="150%";
      }
    }
    function MouseOffPanel(event){
      if(event.target.style.bg==="t"){
        event.target.style.width = "80%";
        event.target.style.height="120%";
      }

    }

    //updating the clock
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
          clearInterval(timerId);
        };
      }, []);

    //styling for paper panel
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));


    //for adding new panels
    const renderHeader = (text, link, body, image) => {

        return  <Grid item class='app' xs= {2} style={{marginTop: "7%", marginLeft: "5%", width: "20%"}}>
                  <Link to={link} style={{textDecoration: "none"}}>
                    <Paper variant="contained" square={false} style={{height:"120%", width: "80%", bg:"t"}} onMouseOver={MouseOverPanel} onMouseOut={MouseOffPanel}>
                      <Item><li class="griditem" onMouseOver={MouseOverLink}>{text}</li></Item>
                      <ButtonBase sx={{ width: 128, height: 128 }} style={{marginRight: '10%'}}>     
                        <Img alt="complex" src={image} style={{marginTop: '10%', marginLeft: "10%", pointerEvents: 'none'}}/>
                      </ButtonBase>
                      <ButtonBase sx={{ width: 128, height: 128 }}>     
                        {body}
                      </ButtonBase>
                    </Paper>
                  </Link>
                </Grid>
        }
    return (
        <div>
            <div class="clock">{date.toLocaleTimeString()}</div>
            <div class="homeitems" style={{marginLeft:"3%"}} >
              <Grid container spacing={{ xs: 2, md: 8}} columns={{ xs: 4, sm: 4, md: 8 }}>
                {renderHeader("SPACE GAME (Gamejam)", "/space", "A project for the scripto game jam using babylonjs (early stages)", BlackSkyBox)}
                {renderHeader("Website Devlog", "/website", "A log of updates and changes made to this website. (Coming Soon)", DevlogImage)}
              </Grid>
            </div>
        </div>
        
    );
}
    
export default Home;