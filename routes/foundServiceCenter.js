var express = require('express');
var router = express.Router();
let axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
    let passedObject = req.animal_config;
    res.render('foundServiceStation', {
        name: passedObject.name,
        streetName: passedObject.address.streetName + ' ' + passedObject.address.streetNumber,
        postNumberCity: passedObject.address.postalCode + ' ' + passedObject.address.city,
        monday: passedObject.openingHours[0],
        tuesday: passedObject.openingHours[1],
        wednesday: passedObject.openingHours[2],
        thursday: passedObject.openingHours[3],
        friday: passedObject.openingHours[4],
        saturday: passedObject.openingHours[5],
        sunday: passedObject.openingHours[6]
    });
});

module.exports = router;