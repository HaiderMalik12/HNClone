
const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const rootPath = require('get-root-path').rootPath;
import config from './config';

// Load environment variables from .env file
dotenv.load();

//routes
const routes = require('../routes/index');

const app = express();

// const views = require('../views')

app.set('views',path.join(rootPath, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: config.jwtSecret, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(express.static(path.join(rootPath, '/public')));

app.use('/',routes);


module.exports = app;