const { Router } = require('express'); 
const app = Router();
const courses = require('../Data/Courses.js');

//פונקציה לקבלת פרטי כלל הקורסים
app.get('/courses',(req,res)=>{
    res.send(courses);
});

app.get('/courses/query', (req, res) => {
    const courseName = req.query.courseName;
    const courses_result = courses.filter(c => c.courseName.includes(courseName));

    if (courses_result.length < 1) {
        return res.status(200).send('No cours matched your search');
    }
    res.json(courses_result);
});

module.exports = app;