import { useEffect, useState } from "react";
function Courses()
{
    const [courses, setCourses] = useState([]);
    useEffect(()=>
    {
        fetch('http://localhost:3000/admin/courses', {
            method: "GET",
            headers: {
                "authentication" : "Bearer " + localStorage.getItem('Token'),
            }
        }).then((response)=>
        {
            response.json().then((data)=>{
                console.log(data);
            })
        })
    }, []);
    return <div>
        <h1>Courses</h1>
    </div>
}

export default Courses;