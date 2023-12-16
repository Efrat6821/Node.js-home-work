const { Router } = require('express');
const app = Router();
const courses = require('../Data/Courses.json');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;

//פונקציה לקבלת פרטי כלל הקורסים
app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/courses/query', async (req, res) => {
    try {
        const courseName = req.query.courseName;
        if (!courseName) {
            return res.status(500).send('The course name must be specified!!');
        }
        const allCourses = (await fsPromises.readFile("../Data/Courses.json"));
        const allCoursesData = JSON.parse(allCourses);
        const courses_result = allCoursesData.filter(c => c.courseName.includes(courseName));
        if (courses_result.length < 1) {
            return res.status(200).send('No cours matched your search');
        }
        res.json(courses_result);
    }
    catch (error) {
        console.log("status kode 500 in courses");
        res.status(500).send("There is currently an error On the server, try again later");
    }
});

app.post('/courses', async (req, res) => {
    const data = req.body;
    try {
        const dataObject = {
            courseId: data.courseId,
            courseName: data.courseName
        }
        const allCourses = await fsPromises.readFile('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json');
        const allCoursesData = JSON.parse(allCourses);
        allCoursesData.push(dataObject);
        console.log(allCoursesData);
        try {
            await fsPromises.writeFile('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json', JSON.stringify(allCoursesData));
            res.send(fs.readFileSync('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json'));
        } catch (err) {
            console.error(err);
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.delete('/courses', async (req, res) => {
    try {
        const courseId = req.body.courseId;
        const allCourses = await fsPromises.readFile('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json');
        const allCoursesData = JSON.parse(allCourses);
        const deleteCourse = allCoursesData.filter(c => c.courseId === parseInt(courseId));
        log(courseId);
        log(deleteCourse);
        if (deleteCourse < 1) {
            log('courseId is not exists');
            res.send('courseId is not exists!')
        }
        else{
        const allCoursesDataAfterDelete = allCoursesData.filter(c => c.courseId != parseInt(courseId));
        log(allCoursesDataAfterDelete);
        try {
            await fsPromises.writeFile('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json', JSON.stringify(allCoursesDataAfterDelete));
            res.send(fs.readFileSync('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json'));
        } catch (err) {
            console.error(err);
        }
    }
    }
    catch (err) {
        log(err);
    }
});

app.put('/courses', async (req, res) => {
    try {
        const update = req.body;
        const allCourses = await fsPromises.readFile('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json');
        const allCoursesData = JSON.parse(allCourses);
        const allCoursesDataAfterUpdate = allCoursesData.map(course => course.courseId === parseInt(update.courseId) ? { courseId: update.courseId, courseName: update.courseName } : course);
        try {
            await fsPromises.writeFile('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json', JSON.stringify(allCoursesDataAfterUpdate));
            res.send(fs.readFileSync('E:/אפרת/מתוקשב/הגשות/8/Data/Courses.json'));
        } catch (err) {
            console.error(err);
        }
    }
    catch (err) {
        log(err);
    }

});


module.exports = app;