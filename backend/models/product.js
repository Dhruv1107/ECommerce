const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	  }
});

//Model connects a schema with a name
// Mongoose creates a collection with name 'products'(mongoose converts Product to products)
module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
// 	constructor(title, price, description, imageUrl, id, userId) {
// 		//id is optional for update
// 		this.title = title;
// 		this.price = price;
// 		this.description = description;
// 		this.imageUrl = imageUrl;
// 		this._id = id ? new mongodb.ObjectId(id) : null;
// 		// If id exists we create ObjectId
// 		this.userId = userId;
// 	}

// 	save() {
// 		const db = getDb();
// 		let dbOp;
// 		if (this._id) {
// 			//If id is set update the product
// 			dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
// 			// updateOne has two arguments
// 			// 1) filter to define which argument to update
// 			// 2) how to update the document
// 		} else {
// 			// If id is not set insert the product
// 			dbOp = db
// 				.collection('products') //If the collection doesn't exist it creates the collection
// 				.insertOne(this); // takes one argument as an object which we want to insert
// 		}

// 		return dbOp
// 			.then((result) => {
// 				console.log(result);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}

// 	static fetchAll() {
// 		const db = getDb();
// 		return (
// 			db
// 				.collection('products')
// 				.find() //Find all  products, find() returns a cursor
// 				// Cursor is an object  which allows to go through our documents step by step
// 				.toArray() // toArray() gets all the documents abd turns them into Javascript array
// 				// We can use toArray if there are less documents, otherwise we use pagination
// 				.then((products) => {
// 					console.log(products);
// 					return products;
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				})
// 		);
// 	}

// 	static findById(prodId) {
// 		const db = getDb();
// 		return (
// 			db
// 				.collection('products')
// 				//Mongodb stores id in _id and it uses special 'ObjectId' type
// 				.find({ _id: new mongodb.ObjectId(prodId) }) // It will give a cursor
// 				.next() // To get the next document that is returned by find
// 				.then((product) => {
// 					console.log(product);
// 					return product;
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				})
// 		);
// 	}

// 	static deleteById(prodId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.deleteOne({ _id: new mongodb.ObjectId(prodId) })
// 			.then((result) => {
// 				console.log('Deleted');
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}
// }

// module.exports = Product;
