const express = require('express');
const app = express();
const courses = require('./controller/coursesController.js');
const workers = require('./controller/workersController.js');


app.listen(5000, () => {
    console.log('server is listening on port 5000');
});

app.get('/',(req,res)=>{
    res.send('welcome to manager courses!!!');
});

app.use(courses);
app.use(workers);