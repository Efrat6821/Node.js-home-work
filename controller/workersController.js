const { Router } = require('express'); 
const app = Router();
const Employees = require('../Data/Employee.js');

//פונקציה לקבלת עובד לפי התפקיד
app.get('/workers/query', (req, res) => {
    const role = req.query.role.toLowerCase();

    const employee_result = Employees.filter(e => e.role.toLowerCase().includes(role));

    if (employee_result.length < 1) {
        return res.status(200).send('No workers matched your search');
    }
    res.json(employee_result);
});


//פונקציה לקבלת עובד בודד לפי קןד מזהה
app.get('/workers/:id', (req, res) => {
    const id = Number(req.params.id);
    const Worker = Employees.find(worker => worker.id === id);

        if (Worker!=undefined) {
         res.send(Worker);
    }
    else{
        res.send("worker dosn't exisct!");
    }
 
});




//פונקציה לקבלת כל העובדים
app.get('/workers',(req,res)=>{
    res.send(Employees);
});

module.exports = app;
