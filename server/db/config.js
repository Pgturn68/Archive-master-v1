const mongoose = require("mongoose");

const DATABASE = 'tripSaver'

const db = mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${DATABASE}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log(`MongoDB ${DATABASE} Database is Connected`))
    .catch((err) => console.log(`An error has occured in DB connection: ${err}`))

module.exports = db;