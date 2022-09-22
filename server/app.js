//Biblioteca de terceros para manejar errores http
//ES5var createError = require('http-errors');
//E6
import createHttpError from 'http-errors';
// El framework express
import express from 'express';
//Biblioteca del nucleo de node que sirve para 
//administrar rutas
import path from 'path';
//Biblioteca externa que sirve para administrar
//cookies
import cookieParser from 'cookie-parser';
//Biblioteca qye registra en consola 
//solicitudes del cliente 
import logger from 'morgan';

//Definición de rutas
import indexRouter from './routes/index';
import usersRouter  from './routes/users';

//Creando una instancia de express
const app = express();

// view engine setup
//Configura el motor de plantillas
//1. Establecer donde estarán las plantillas
//(vistas -> Views)
//app.set("<nombre de la  var>", <valor>)
app.set('views', path.join(__dirname, 'views'));
//Establezco que motor precargado usare
app.set('view engine', 'hbs');

//Establezco Middelware
app.use(logger('dev'));
//Middelware para parsear a json la petición 
app.use(express.json());
//Decodificador la url 
app.use(express.urlencoded({ extended: false }));
//Parsear cookies
app.use(cookieParser());
//Servidor de archivos estáticos
app.use(express.static(path.join(__dirname,'..', 'public')));

//Registro Rutas
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Exportando la instancia del server "app"
//ES5  👇🏻
//module.exports = app;
//ES6 👇🏻
export default app;
