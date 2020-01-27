var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    const passedObject = req.responseObject;
    res.render('foundMailbox', {
        title: 'Found Mailbox',
        name: passedObject.id,
        streetName: passedObject.address1,
        postNumberCity: passedObject.postalcode + ' ' + passedObject.postalcity,
    });
});

module.exports = router;