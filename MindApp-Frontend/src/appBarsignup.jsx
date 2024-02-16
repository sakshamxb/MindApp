import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

function AppbarSignup() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/me/", {
      method: "GET",
      headers: {
        "authorization": "Bearer " + localStorage.getItem("Token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.email)
        {
          setUserEmail(data.email);
        }
        console.log(data);
        
      });
  }, []);

  if (userEmail)
  {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography variant='h4' style={{ marginTop: 15, marginBottom: 2, marginLeft: 12, color: "white" }}>MindAPP</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "right", marginTop: 10, marginBottom: 20 }}>
          <Button
            style={{ width: "100px", marginTop: "10px", marginBottom: 0, marginRight: 12, paddingRight: 70, paddingLeft: 70 }}
            variant="contained"
            disableElevation
            onClick={() => {
              window.location = "/login"
            }}
          >
            {userEmail}
          </Button>
          <Button style={{width: "100px", marginTop: "10px", marginBottom: 0, marginLeft: 10, marginRight: 12}} variant="contained" disableElevation onClick={()=>
              {
                  window.location = "/signup",
                  localStorage.removeItem('Token');
              }}>
                  Log Out
              </Button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography variant='h4' style={{ marginTop: 15, marginBottom: 2, marginLeft: 12, color: "white" }}>MindApp</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "right", marginTop: 10, marginBottom: 20 }}>
        {userEmail}
        <Button
          style={{ width: "100px", marginTop: "10px", marginBottom: 0, marginRight: 12 }}
          variant="contained"
          disableElevation
          onClick={() => {
            window.location = "/login"
          }}
        >
          Log in
        </Button>
        <Button style={{width: "100px", marginTop: "10px", marginBottom: 0, marginLeft: 10, marginRight: 12}} variant="contained" disableElevation onClick={()=>
            {
                window.location = "/signup"
            }}>
                Sign up
            </Button>
      </div>
    </div>
  );
}

export default AppbarSignup;
