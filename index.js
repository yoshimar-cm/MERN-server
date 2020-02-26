const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');

//1.-crear el servidor
const app = express();

//4.- conectar a la base de datos
dbConnect();

//7.- habilitar cors
app.use(cors());

//6.- habilitar express.json | parset
app.use(express.json({extended: true}));

//2.-puerto de la app
const PORT = process.env.PORT || 4000;

//5.-importar rutas
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks',require('./routes/tasks'));

//3.-arrancar el servidor
app.listen(PORT,()=>{
    console.log('el servidor esta corriendo');
})