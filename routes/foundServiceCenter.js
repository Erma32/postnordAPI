var express = require('express');
var router = express.Router();
let axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
    let passedObject = req.animal_config;
    res.render('foundServiceStation', {
        name: passedObject.name,
        streetName: passedObject.address.streetName + ' ' + passedObject.address.streetNumber,
    });
});

module.exports = router;