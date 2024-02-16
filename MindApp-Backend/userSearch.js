function searchUser(userdata, username, password)
{
    for(var i = 0; i < userdata.length;i++)
    {
        if(userdata[i].username === username && userdata[i].password === password)
        {
            return true;
        }
    }
    return false;
}

module.exports = searchUser;