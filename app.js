const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const staticDirectory = require('serve-static');
const ejs = require('ejs');
const { v4: uuid } = require('uuid');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const formRouter = require('./routes/formRoutes');

const HOSTNAME = 'localhost';
const PORT = 3000;
const DB_SERVER = 'mongodb://127.0.0.1:27017';
const database = 'application';

mongoose.set('strictQuery', true);
mongoose.connect(`${DB_SERVER}/${database}`)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(staticDirectory(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use('/tasks', taskRouter);
app.use('/user', userRouter);
app.use('/', formRouter);

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/view/error', (req, res) => {
    res.writeHead(404, { "Content-type": "text/html" });
    res.render('error');
});


app.listen({ path: HOSTNAME, port: PORT }, (error) => {
    if (error) return console.log(error);
    console.log('Server is running on port 3000...');
}); 
