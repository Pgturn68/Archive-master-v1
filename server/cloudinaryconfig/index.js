require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.dyuqfsfxi,
    api_key: process.env.214151298519215,
    api_secret: process.env.aJQPksIUcxTNl6dpg7pkZ3Y9BnI,
    secure: true
});

module.exports = cloudinary;