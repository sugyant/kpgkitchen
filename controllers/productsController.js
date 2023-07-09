const Product = require('../models/Products');


module.exports = {
	createProduct: async(req, res) => {
		const newProduct =  new Product(req.body);
		try{
			await newProduct.save();
			res.status(200).json("product created successfully");
		}
		catch(error){
			res.status(500).json("failed to create product");
		}
	},
	getAllProducts: async(req, res) => {
		try{
			const products =  await Product.find().sort({createdAt: -1})
			res.status(200).json(products);
		}
		catch(error){
			res.status(500).json("failed to get all products");
		}
	},
	getProduct: async(req, res) => {
		try{
			const prod =  await Product.findById(req.params.id)
			res.status(200).json(prod);
		}
		catch(error){
			res.status(500).json("failed to get the product");
		}
	},
	searchProduct: async(req, res) => {
		try{
			const results =  await Product.aggregate([
				{
				  $search: {
					index: "foods",
					text: {
					  query: req.params.key,
					  path: {
						wildcard: "*"
					  }
					}
				  }
				}
			  ])
			res.status(200).json(results);
		}
		catch(error){
			res.status(500).json("failed to get the products");
		}
	}
}
