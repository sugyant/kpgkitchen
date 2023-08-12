const router = require('express').Router();
const stripe = require('stripe')(
	'sk_test_51NeAD8SEn9H5jX3liDAFU7VpG6ArFRtTFesGPHQGmvzlnjNUX4djOIg9ZJEvMR8A82AvxLxEIrpT66AzQZlpgvrw00QJmuSFWP'
	);

//module endpoints
router.post('/intents', async(req,res) => {
	try{
	// create payment intenet 
	const paymentIntent = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: 'inr',
		automatic_payment_methods:{
			enabled:true
		}
	})
	//return the secret
	res.json({paymentintent: paymentIntent.client_secret});
	}
	catch(e){
		res.status(400).json({
			error: e.message,
		});
	}
});


module.exports =  router;
