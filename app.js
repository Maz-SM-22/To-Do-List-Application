const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const static = require('serve-static');
const ejs = require('ejs');

const hostname = 'localhost';
const port = 3000;

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());
app.use(static(__dirname + '/public'));
app.set('view engine', 'ejs');

let user;

const tasks = [
    {
        id: 1,
        text: 'coding',
        completed: false
    },
    {
        id: 2,
        text: 'chilling',
        completed: false
    },
    {
        id: 3,
        text: 'dining',
        completed: false
    },
    {
        id: 4,
        text: 'sleeping',
        completed: false
    },
    {
        id: 5,
        text: 'reading',
        completed: false
    }
]

app.get('/', (req, res) => {
    res.render('index', { name: 'Maria', length: 5 });
})

app.route('/tasks')
    .post(urlencodedParser, (req, res) => {
        let newtask = {
            id: 6,
            text: req.body.newtask,
            completed: false
        }
        tasks.push(newtask);
        res.send(tasks);
    })


app.listen({ path: hostname, port: 3000 }, (error) => {
    if (error) return console.log(error);
    console.log('Server is running on port 3000...');
}); 
