const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente' });
});

// Ruta para sumar dos números
app.post('/sumar', (req, res) => {
    let { num1, num2 } = req.body;

    // Convertir a número por si vienen como strings
    num1 = Number(num1);
    num2 = Number(num2);

    // Validación
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send({ error: 'Los valores deben ser numéricos' });
    }

    // Operación y respuesta
    const resultado = num1 + num2;
    res.send({ resultado });
});

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});
