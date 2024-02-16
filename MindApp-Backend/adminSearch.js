function adminSearch(adminData, username, password)
{
    for(var i = 0; i < adminData.length; i++)
    {
        if(username === adminData[i].username && password === adminData[i].password)
        {
            return true;
        }
    }
    return false;
}

module.exports = adminSearch;