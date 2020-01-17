const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	// cart: {items: [{productId: '', quantity: number}]}
	cart: {
		items: [
			{
				productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				quantity: { type: Number, required: true }
			}
		]
	}
});

userSchema.methods.addToCart = function(product) {
	const cartProductIndex = this.cart.items.findIndex((cp) => {
		return cp.productId.toString() === product._id.toString();
	});
	let newQuantity = 1;

	//Get the cart items and store it in new variable
	const updatedCartItems = [ ...this.cart.items ];

	if (cartProductIndex >= 0) {
		//Product already exists in cart
		newQuantity = this.cart.items[cartProductIndex].quantity + 1;
		updatedCartItems[cartProductIndex].quantity = newQuantity;
	} else {
		//Product not there in cart so we add it in cart
		updatedCartItems.push({
			productId: product._id,
			quantity: newQuantity
		});
	}
	const updatedCart = {
		items: updatedCartItems
	};
	this.cart = updatedCart;
	return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
	//removes the product which has the productId passed in as argument to the finction
	const updatedCartItems = this.cart.items.filter((item) => {
		return item.productId.toString() !== productId.toString();
	});
	this.cart.items = updatedCartItems;
	return this.save();
};

userSchema.methods.clearCart = function() {
	this.cart = { items: [] };
	return this.save();
};

module.exports = mongoose.model('User', userSchema);
// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
// 	constructor(username, email, cart, id) {
// 		this.name = username;
// 		this.email = email;
// 		this.cart = cart; // {items: [{productId: '', quantity: number}]}
// 		this._id = id;
// 	}

// 	save() {
// 		const db = getDb();
// 		return db
// 			.collection('user')
// 			.insertOne(this)
// 			.then((result) => {
// 				console.log(result);
// 			})
// 			.catch((err) => console.log(err));
// 	}

// 	addToCart(product) {
// 		console.log('hello' + this.cart);
// 		const cartProductIndex = this.cart.items.findIndex((cp) => {
// 			return cp.productId == product._id;
// 		});
// 		let newQuantity = 1;

// 		//Get the cart items and store it in new variable
// 		const updatedCartItems = [ ...this.cart.items ];

// 		if (cartProductIndex >= 0) {
// 			//Product already exists in cart
// 			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
// 			updatedCartItems[cartProductIndex].quantity = newQuantity;
// 		} else {
// 			//Product not there in cart so we add it in cart
// 			updatedCartItems.push({
// 				productId: new ObjectId(product._id),
// 				quantity: newQuantity
// 			});
// 		}
// 		const updatedCart = {
// 			items: updatedCartItems
// 		};
// 		const db = getDb();
// 		return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } });
// 	}

// 	getCart() {
// 		const db = getDb();
// 		const productIds = this.cart.items.map((i) => {
// 			return i.productId;
// 		});
// 		return db
// 			.collection('products')
// 			.find({ _id: { $in: productIds } }) //Gives the cursor with all elements where id is one of the id's present in the array
// 			.toArray()
// 			.then((products) => {
// 				//products == Array ofproducts from the database
// 				return products.map((p) => {
// 					return {
// 						...p,
// 						quantity: this.cart.items.find((i) => {
// 							return i.productId.toString() === p._id.toString();
// 						}).quantity
// 					};
// 				});
// 			});
// 	}

// 	deleteItemFromCart(productId) {
// 		const db = getDb();
// 		//removes the product which has the productId passed in as argument to the finction
// 		const updatedCartItems = this.cart.items.filter((item) => {
// 			return item.productId.toString() !== productId.toString();
// 		});
// 		return db
// 			.collection('users')
// 			.updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } });
// 	}

// 	addOrder() {
// 		const db = getDb();
// 		return this.getCart()
// 			.then((products) => {
// 				const order = {
// 					items: products,
// 					user: {
// 						_id: new ObjectId(this._id),
// 						name: this.name
// 					}
// 				};
// 				return db.collection('orders').insertOne(order);
// 			})
// 			.then((result) => {
// 				//After adding the order empty the cart variable and empty the cart from the database
// 				this.cart = { items: [] };
// 				return db
// 					.collection('users')
// 					.updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { items: [] } } });
// 			});
// 	}

// 	getOrders() {
// 		const db = getDb();
// 		return db.collection('orders').find({ 'user._id': new ObjectId(this._id) }).toArray();
// 	}

// 	static findById(userId) {
// 		const db = getDb();
// 		return db.collection('users').findOne({ _id: new ObjectId(userId) });
// 	}
// }

// module.exports = User;
