import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AppbarSignup from './appBarsignup';

function Login()
{
    return <div>
        <AppbarSignup></AppbarSignup>
        <div style={{paddingTop: "180px"}}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: -1 }}></div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <center><div style={{padding: "20px"}}><Typography style={{color:"white"}} variant="h5" gutterBottom>Welcome back. Log in below</Typography></div></center>
            </div>
            <div style={{display: 'flex', justifyContent:'center'}}>
                <Card sx={{ width: 450, backgroundColor:"lightgrey"}}>
                <TextField id="standard-basic" label="Email" variant="standard" style={{width: "300px", marginTop: "25px", marginLeft: 70}}/>
                <div />
                <TextField id="standard-basic" label="Password" variant="standard" type='password' style={{width: "300px", marginTop: "12px",  marginLeft: 70}}/>
                <div style={{marginTop: "20px"}}/>
                <Button style={{width: "300px", marginTop: "10px", marginBottom: 35,  marginLeft: 70}} variant="contained" disableElevation>Log in</Button>
                </Card>
            </div>

        </div>
    </div>
}

export default Login;
