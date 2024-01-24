import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import photo from "./images/IMG_0932.jpg";
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
function About() {
    return (
        <div >
        <Grid container spacing={{ xs: 2, md: 8}} columns={{ xs: 4, sm: 4, md: 8 }}>
        <Grid item class='app' xs= {2} style={{marginTop: "7%", marginLeft: "10%", width: "80%",height: "80%"}}>
                    <Paper square={false} style={{height:"100%"}}>
                    <ButtonBase sx={{ width: "20%", height: "90%" }} style={{marginRight: '10%'}}>
                    <Img alt="complex" src={photo} style={{marginTop: '10%', marginLeft: "10%", width: "100%", height: "100%"}}/>     
                    </ButtonBase>
                    <ButtonBase sx={{ width: 128, height: 128 }}>     
                    COMING SOON
                    </ButtonBase>
                  </Paper>
                </Grid>
        </Grid>
      </div>
        );
    }
    
export default About;