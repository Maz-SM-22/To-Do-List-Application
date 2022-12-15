const express = require('express');
const path = require('path');
const staticDirectory = require('serve-static');
const ejs = require('ejs');
const { v4: uuid } = require('uuid');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const formRouter = require('./routes/formRoutes');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(express.json());
app.use(staticDirectory(__dirname + '/public'));
app.set('view engine', 'ejs');

// app.get('/', (res, req) => {
//     res.render('home');
// })

app.use('/tasks', taskRouter);
app.use('/user', userRouter);
app.use('/', formRouter);

app.get('/view/error', (req, res) => {
    res.writeHead(404, { "Content-type": "text/html" });
    res.render('error');
});


app.listen({ path: hostname, port: 3000 }, (error) => {
    if (error) return console.log(error);
    console.log('Server is running on port 3000...');
}); 
