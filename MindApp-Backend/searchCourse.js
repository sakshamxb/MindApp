function searchCourse(courseData, courseId)
{
    for (var i = 0; i < courseData.length; i++)
    {
        if(courseData[i].id === courseId)
        {
            return courseData[i];
        }
        else
        {
            return null;
        }
    }
}

module.exports = searchCourse;