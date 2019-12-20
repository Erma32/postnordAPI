var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let axios = require('axios');

const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let serviceRouter = require('./routes/foundServiceCenter');

let servicePointName;
let servicePointAddress;
let openingHours;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/foundServiceStation', function (req, res, next) {
    req.animal_config = {
        name: servicePointName,
        address: servicePointAddress,
        openingHours: openingHours
    };
    next();
}, serviceRouter);

app.post('/add', (req, res) => {
  let apiPath = 'https://api2.postnord.com/rest/businesslocation/v1/servicepoint/findByPostalCode.json?apikey=20ca9b31c52d7fda7e7bf3eddee6095e&countryCode=' + req.body.countryCode + '&postalCode=' + req.body.postalCode;
  axios({
    method: 'get',
    url: apiPath,
   }).then(function (response) {
       const responseObject = response.data.servicePointInformationResponse.servicePoints[0];
       servicePointName = responseObject.name;
       servicePointAddress = responseObject.visitingAddress;
       openingHours = responseObject.openingHours;
       res.redirect('/foundServiceStation')
   }).catch(function (err){
    console.log(err);
     return err
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;