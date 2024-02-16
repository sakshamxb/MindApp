import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AppbarSignup from './appBarsignup';
import { useState } from 'react';

function Signup()
{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return <div>
        <AppbarSignup></AppbarSignup>
        <div style={{paddingTop: "180px"}}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: -1 }}></div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <center><div style={{padding: "20px"}}><Typography style={{color:"white"}} variant="h5" gutterBottom>Welcome to The MindApp. Sign up below</Typography></div></center>
            </div>
            <div style={{display: 'flex', justifyContent:'center'}}>
                <Card sx={{ width: 450, backgroundColor:"lightgrey"}}>
                <TextField 
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                label="Email" 
                variant="standard" 
                style={{width: "300px", marginTop: "25px", marginLeft: 70}}/>
                <div />
                <TextField 
                onChange={(e)=>
                {
                    setPassword(e.target.value);
                }}
                label="Password" 
                variant="standard" 
                type='password' 
                style={{width: "300px", marginTop: "12px",  marginLeft: 70}}/>
                
                <div style={{marginTop: "20px"}}/>
                
                <Button style={{width: "300px", marginTop: "10px", marginBottom: 35,  marginLeft: 70}} variant="contained" disableElevation
                    onClick={()=>
                    {
                        fetch("http://localhost:3000/admin/signup",
                        {
                            method: "POST",
                            headers: {"content-type":"application/json"},
                            body: JSON.stringify({username: email, password: password})
                        }).then((response)=>
                            response.json()
                        ).then((data)=>
                        {
                            console.log(data);
                            localStorage.setItem('Token', data.Token);
                            window.location = '/admin/me'; 
                        });
                    }}
                >
                    Sign up
                </Button>
                </Card>
            </div>

        </div>
    </div>
}

export default Signup;
