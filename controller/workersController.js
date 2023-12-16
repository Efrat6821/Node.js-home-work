const { Router } = require('express'); 
const app = Router();
const Employees = require('../Data/Employee.json');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const fs = require('fs');
const { log } = require('console');
const fsPromises = require('fs').promises;

//פונקציה לקבלת עובד לפי התפקיד
app.get('/workers/query', (req, res) => {
    try{
    const role = req.query.role.toLowerCase();
    if(role==null){
        //console.log();
        return res.status(500).send("role is undifind")
    }
    const employee_result = Employees.filter(e => e.role.toLowerCase().includes(role));

    if (employee_result.length < 1) {
        return res.status(200).send('No workers matched your search');
    }
    res.json(employee_result);}
    catch(error){
        console.log("status kode 500 in the workers");
        res.status(500).send("There is currently an error On the server, try again later");
        
    }

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

app.post('/workers', async (req, res) => {
    const data = req.body;
    try {
        const dataObject = {
            id: data.id,
            name: data.name,
            phon: data.phon,
            email: data.email,
            role: data.role,
            platoon: data.platoon,
            joinDate: data.joinDate
        }
        const allWorkers = await fsPromises.readFile('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json');
        const allWorkersData = JSON.parse(allWorkers);
        allWorkersData.push(dataObject);
        console.log(allWorkersData);
        try {
            await fsPromises.writeFile('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json', JSON.stringify(allWorkersData));
            res.send(fs.readFileSync('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json'));
        } catch (err) {
            console.error(err);
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.delete('/workers', async (req, res) => {
    try {
        const id = req.body.id;
        const allWorkers = await fsPromises.readFile('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json');
        const allWorkersData = JSON.parse(allWorkers);
        const deleteworker = allWorkersData.filter(w => w.id === parseInt(id));
        log(id);
        log(deleteworker);
        if (deleteworker < 1) {
            log('worker is not exists');
            res.send('worker is not exists!')
        }
        else{
        const allWorkersDataAfterDelete = allWorkersData.filter(w => w.id != parseInt(id));
        log(allWorkersDataAfterDelete);
        try {
            await fsPromises.writeFile('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json', JSON.stringify(allWorkersDataAfterDelete));
            res.send(fs.readFileSync('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json'));
        } catch (err) {
            console.error(err);
        }
    }
    }
    catch (err) {
        log(err);
    }
});

app.put('/workers', async (req, res) => {
    try {
        const update = req.body;
        const allWorkers = await fsPromises.readFile('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json');
        const allWorkersData = JSON.parse(allWorkers);
        const allWorkersDataAfterUpdate = allWorkersData.map(w => w.id === parseInt(update.id) ? { id: update.id, name: update.name, phon: update.phon, emaile: update.email, role: update.role, platoon: update.platoon, joinDate: update.joinDate } : w);
        try {
            await fsPromises.writeFile('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json', JSON.stringify(allWorkersDataAfterUpdate));
            res.send(fs.readFileSync('E:/אפרת/מתוקשב/הגשות/8/Data/Employee.json'));
        } catch (err) {
            console.error(err);
        }
    }
    catch (err) {
        log(err);
    }

});

module.exports = app;
