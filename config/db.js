const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

const connectToMongoDB = () => {
	return new Promise(async (resolve, reject) => {
		mongoose.disconnect();
		mongoServer = await MongoMemoryServer.create();
		const mongoUri = await mongoServer.getUri();
		mongoose
			.connect(mongoUri, { dbName: "db_users" })
			.then((conn) => resolve(conn))
			.catch((err) => reject(err));
	});
};

const close = async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
};

module.exports = { connectToMongoDB, close };
