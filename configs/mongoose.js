const mongoose = require("mongoose");
const { MONGO_DB_URL } = process.env; //saving  the mongoDB url in .env file

const options = {
	maxPoolSize: 10, //maximum number of connections to
	family: 4, //Use IPv4, skip trying IPv6
	connectTimeoutMS: 15000, //maximum time for connection
};

//connect the  MongoDB using mongoose
mongoose.connect(MONGO_DB_URL, options )
.then(()=>{
    console.log('Database connected successfully'); //if database connected
})
.catch((err)=>{
    console.log(`Database connected error: ${err}`); //if any connection error
});

//exporting the mongoose connection object
const dB = mongoose.connection;

module.exports = dB;
