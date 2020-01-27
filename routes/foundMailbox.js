var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    const passedObject = req.responseObject;
    const address = req.responseObject.visitingAddress;
    const hours = req.responseObject.openingHours;
    res.render('foundServiceStation', {
        title: 'Found Service Center',
        name: passedObject.name,
        streetName: address.streetName + ' ' + address.streetNumber,
        postNumberCity: address.postalCode + ' ' + address.city,
        monday: hours[0],
        tuesday: hours[1],
        wednesday: hours[2],
        thursday: hours[3],
        friday: hours[4],
        saturday: hours[5],
        sunday: hours[6]
    });
});

module.exports = router;