import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SpaceGame from './SpaceGame';
import { Route, Link , Routes} from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import BlackSkyBox from "./assets/02-34-11-741_512.gif";
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
    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
          clearInterval(timerId);
        };
      }, []);
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    const renderHeader = (text, link, body) => {
        return  <Grid item xs={2}>
                  <Paper sx={{height:200, width: "80%"}}>
                    <Item><li class="griditem"><Link to={link} style={{textDecoration: "none", color: "black"}}>{text}</Link></li></Item>
                    {body}
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Link to={link}>
                        <Img alt="complex" src={BlackSkyBox} style={{marginTop: "10%", marginLeft: "10%"}} />
                      </Link>
                    </ButtonBase>
                  </Paper>
                </Grid>
        }
    return (
        <div>
            <div class="clock">
                {date.toLocaleTimeString()}
            </div>
            <div class="homeitems">
              <Grid container spacing={{ xs: 2, md: 12}} columns={{ xs: 4, sm: 4, md: 8 }}>
                {renderHeader("SPACE GAME (Gamejam)", "/space", "A project for the scripto game jam using babylonjs")}
              </Grid>
            </div>
        </div>
        
    );
}
    
export default Home;