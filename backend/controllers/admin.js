const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false
	});
};

// 'C' Create product
exports.postAddProduct = (req, res, next) => {
	console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
	console.log(req.body);
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = +req.body.price;
	const description = req.body.description;
	const product = new Product({
		title:title,
		price:price,
		description:description,
		imageUrl:imageUrl,
		userId: req.user
	});
	product
		.save()
		.then((result) => {
			// console.log(result);
			res.status(201).json({
				message: "Post added successfully",
				postId: result._id
			  });
			console.log('Created Product');
			// res.redirect('/admin/products');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/');
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			if (!product) {
				return res.redirect('/');
			}
			res.render('admin/edit-product', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product
			});
		})
		.catch((err) => console.log(err));
};

// 'U' Update products
exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDesc = req.body.description;
	Product.findById(prodId).then(product => {
		product.title = updatedTitle;
		product.price = updatedPrice;
		product.description=updatedDesc;
		product.imageUrl = updatedImageUrl;
		return product.save();
	})
	.then((result) => {
		console.log('UPDATED PRODUCT!');
		res.redirect('/admin/products');
	})
	.catch((err) => console.log(err));
};

// 'R'Read products
exports.getProducts = (req, res, next) => {
	Product.find()	//gives all documents
		.then((products) => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin Products',
				path: '/admin/products'
			});
		})
		.catch((err) => console.log(err));
};

// 'D' Delete Products
exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByIdAndRemove(prodId)
		.then(() => {
			console.log('DESTROYED PRODUCT');
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};
