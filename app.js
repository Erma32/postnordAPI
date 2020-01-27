const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let axios = require('axios');
const favicon = require('serve-favicon');

const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mailboxRouter = require('./routes/mailbox');
let serviceRouter = require('./routes/foundServiceCenter');
const foundBoxRouter = require('./routes/foundMailBox');

let responseObject;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mailbox', mailboxRouter);
app.use('/foundServiceStation', function (req, res, next) {
    req.responseObject = responseObject;
    next();
}, serviceRouter);
app.use('/foundMailbox', function (req, res, next) {
    req.responseObject = responseObject;
    next();
}, foundBoxRouter);

app.post('/add', (req, res) => {
  let apiPath = 'https://api2.postnord.com/rest/businesslocation/v1/servicepoint/findByPostalCode.json?apikey=20ca9b31c52d7fda7e7bf3eddee6095e&countryCode=' + req.body.countryCode + '&postalCode=' + req.body.postalCode;
  axios({
    method: 'get',
    url: apiPath,
   }).then(function (response) {
       responseObject = response.data.servicePointInformationResponse.servicePoints[0];
       res.redirect('/foundServiceStation')
   }).catch(function (err){
       errorHandler(err, req, res);
     return err
  });
});

app.post('/addPostbox', (req, res) => {
    let apiPath = 'https://api2.postnord.com/rest/location/v1/mailbox/search?q=' + req.body.location + '&country=SE&apikey=20ca9b31c52d7fda7e7bf3eddee6095e';
    axios({
        method: 'get',
        url: apiPath,
    }).then(function (response) {
        console.log(response.data[1]);
        responseObject = response.data[1];
        res.redirect('/foundMailbox')
    }).catch(function (err){
        errorHandler(err, req, res);
        return err
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
function errorHandler(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

module.exports = app;