const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const adminSearch = require('./adminSearch');
const courseSearch = require('./searchCourse');
const userSearch = require('./userSearch');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

//AUTHENTICATION MIDDLEWARES

const secretkey = "Auth_Secret_101";

function generateJwt(username)
{
    const payload = username;
    return jwt.sign(payload, secretkey);
}

const authenticateJwt = (req, res, next)=>
{
    const authHeader = req.headers.authorization;

    if(authHeader)
    {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretkey, (err, user)=>
        {
            if(err) res.status(401).send(`Admin Unauthorized`);
            req.user = user;
            next();
        })
    }
}

const adminAuth = (req, res, next)=>
{
    const {username, password} = req.headers;
    
    fs.readFile('admin.json', 'utf-8', (err, data)=>
    {
        if (err) console.error(err);
        const adminData = JSON.parse(data);
        const loginStatus = adminSearch(adminData, username, password);
        if(loginStatus)
        {
            next();
        }
        else
        {
            res.status(403).json({ message: 'Admin authentication failed' })
        }
    });
}

const userAuth = (req, res, next) =>
{
    const {username, password} = req.headers;

    fs.readFile('user.json', 'utf-8', (err,data)=>
    {
        if(err) console.error(err);
        const usrData = JSON.parse(data);
        const stauts = userSearch(usrData, username, password);
        if(stauts)
        {

            next();
        }
        else
        {
            res.json(`User Authentication Failed`);
        }
    })

}

//ADMIN Routes

app.post('/admin/signup', (req, res)=>
{
    const newAdmin = 
    {
        username : req.body.username,
        password : req.body.password
    }

    fs.readFile('admin.json','utf-8', (err, data)=>
    {
        if(err) console.error(err);
        const adminData = JSON.parse(data);
        adminData.push(newAdmin);

        fs.writeFile('admin.json', JSON.stringify(adminData), (err)=>
        {
            if(err) 
            {
                console.error(err);
                console.log(`Internal Server Error: ${err}`);
            }
            else
            {
                const token = generateJwt(newAdmin.username);
                res.json({message: `Admin ${newAdmin.username} created successfully`, Token: token});
            }
        });
    });
});

app.post('/admin/login', authenticateJwt, (req, res)=>
{
    const {username} = req.headers;
    const token = generateJwt(username);
    res.json({message: `${username} Logged in successfully`, Token:`${token}`});
});

app.post('/admin/courses', authenticateJwt, (req, res)=>
{
    const newCourse = 
    {
        id: Math.floor(Math.random()*1000),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        published: req.body.published
    }

    fs.readFile('courses.json', 'utf-8', (err, data)=>
    {
        if(err) console.error(err);
        const courseData = JSON.parse(data);
        courseData.push(newCourse);
        fs.writeFile('courses.json', JSON.stringify(courseData), (err)=>
        {
            if(err) console.error(err);
            res.send(`Course Added Successfully`);
        })
    })
});

app.get('/admin/courses', authenticateJwt, (req, res)=>
{
    fs.readFile('courses.json', 'utf-8', (err, data)=>
    {
        if(err) console.error(err);
        rec = JSON.parse(data);
        res.json(rec);
    })
})

app.put('/admin/courses/:id', adminAuth, (req, res)=>
{
    var courseId = req.params.id;
    fs.readFile('courses.json', 'utf-8', (err, data)=>
    {
        if(err) console.error(err);
        var courseData = JSON.parse(data);
        var course = courseSearch(courseData, courseId);

    })
})

app.get('/admin/me', authenticateJwt, (req, res)=>
{
    const email = req.user;
    res.json({email});
})

//USER Routes :: Under Progress

app.post('/users/signup', (req, res)=>
{
    const newUsr = 
    {
        username: req.body.username,
        password: req.body.password
    }

    fs.readFile('user.json', 'utf-8', (err, data)=>
    {
        if(err) console.error(err);
        const usrData = JSON.parse(data);
        usrData.push(newUsr);

        fs.writeFile('user.json', JSON.stringify(usrData), (err)=>
        {
            if(err) console.error(err);
            res.status(200).json(`User ${newUsr.username} added successfully`);
        })
    });
});

app.post('/users/login', userAuth, (req, res)=>
{
    const username = req.headers.username;
    res.json(`${username} logged in successfully`);
})

const port = 3000;
app.listen(port, ()=>
{
    console.log(`Example app is listening on port ${port}`);
})