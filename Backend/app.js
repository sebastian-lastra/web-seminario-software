//========== Importación de modulos
var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var path       = require('path');


//========== Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/AplicacionWeb');


//========== Inicializacion de modelos
var Producto = require('./models/productoModel');


//========== Inicializacion de webapp
var app = express();
var port = process.env.PORT || 3000;


//========= Configuracion de retorno
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//========= Configurar static folder front elements
app.use("/front", express.static(__dirname + '/../Frontend/static'));


//========= Implementacion de controladores 
var productoRouter = require('./Routes/productoRoutes')(Producto);
app.use('/api/Producto', productoRouter);


//========= Implementacion de llamado de acciones en duro
app.get('/'                      , function(req, res) { res.send('Hola Mundo!')                                                        ; });
app.get('/productos.html'        , function(req, res) { res.sendFile(path.resolve('../Frontend/templates/productos/index.html'))      ; });
app.get('/agregarProducto.html'  , function(req, res) { res.sendFile(path.resolve('../Frontend/templates/productos/agregar.html'))    ; });
app.get('/modificarProducto.html', function(req, res) { res.sendFile(path.resolve('../Frontend/templates/productos/modificar.html'))  ; });
app.get('/jquery-1.12.1.min.js'  , function(req, res) { res.sendFile(path.resolve('../Frontend/static/jquery/jquery-1.12.1.min.js'))  ; });


//======== Ejecucion de webapps
app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});