import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import photo from "./images/IMG_0932.jpg";
import { Link } from 'react-router-dom';


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
                <Paper square={false} style={{height:"100%", display: 'flex'}}>
                    <ButtonBase sx={{ width: "20%", height: "90%" }} style={{marginRight: '10%', flexDirection: 'row'}}>
                        <Img alt="complex" src={photo} style={{marginTop: '5%', marginLeft: "10%", marginBottom: '5%', width: "100%", height: "90%"}}/>     
                    </ButtonBase>
                    <ButtonBase sx={{ width: '25%', height: '10%' }} style={{flexDirection: 'column'}}>   
                        <a class="paneltitle">ABOUT ME: </a>
                        <a class="panelContent">I am a software developer currently specializing in game development.</a>   
                        <a class="panelContent">{"I graduated from Texas Tech with B.S. in Computer Science, my senior capstone project was to fine tune an LLM (we chose Falcon 7b from hugging face) to meet specifications given to us by Lockheed Martin"}</a>
                        <Link to={"https://karltonh.github.io/Rollingthunder_ttu/"}><a class="panelContent">(More information on capstone project)</a></Link>
                        <a class="panelContent">This website serves as a public place for my portfolio.</a>
                    </ButtonBase>
                    <ButtonBase sx={{ width: '25%', height: '10%'}} style={{flexDirection: 'column'}}>   
                        <a class="paneltitle">CURRENT PROJECTS: </a>
                        <a class="panelContent">Space Game.</a>    
                    </ButtonBase>
                </Paper>
            </Grid>
        </Grid>
      </div>
        );
    }
    
export default About;