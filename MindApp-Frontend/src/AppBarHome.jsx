import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

function AppbarHome()
{
    return <div style={{display:"flex", justifyContent: "space-between"}}>
        <div>
            <Typography variant='h4' style={{marginTop: 15, marginBottom:2, marginLeft: 12, color: "white"}}>MindApp</Typography>
        </div>
        <div style={{display:"flex", justifyContent: "right", marginTop: 10, marginBottom: 20}}>
            <Button style={{width: "100px", marginTop: "10px", marginBottom: 0, marginLeft: 10, marginRight: 12}} variant="contained" disableElevation onClick={()=>
            {
                window.location = "/signup"
            }}>
                Sign up
            </Button>
            <Button style={{width: "100px", marginTop: "10px", marginBottom: 0, marginRight: 12}} variant="contained" disableElevation onClick={()=>
            {
                window.location = "/login"
            }}>
                Log in
            </Button>
        </div>
    </div>
}

export default AppbarHome;
