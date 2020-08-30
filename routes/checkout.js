var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
    var gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: 'wzc3bx6h4zhy47j7',
        publicKey: 'n38pmznqnyhc8qby',
        privateKey: '88ceb4af5170104caa6eca4564b55e4b'
    });

    // Use the payment method nonce here
    var nonceFromTheClient = req.body.paymentMethodNonce;
    // Create a new transaction for $10
    var newTransaction = gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonceFromTheClient,
        options: {
            // This option requests the funds from the transaction
            // once it has been authorized successfully
            submitForSettlement: true
        }
    }, function(error, result) {
        if (result) {
            res.send(result);
        } else {
            res.status(500).send(error);
        }
    });
});

module.exports = router;