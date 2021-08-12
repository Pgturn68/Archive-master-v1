const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();
const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true)
      }
});
// const upload = multer({ dest: "uploads/" });

// Connection to the MongoDB Database
require('./db');  // OR
// require('./database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/trip', upload.any());

//  array('files', 9999)

// app.use('/api/trip', function (req, res, next) {
//     console.log('Request URL:', req.originalUrl)
//     next()
// })

// app.use('/api/trip', upload.array('files', 15))


// API
const tripRoutes = require('./routes');
app.use('/', tripRoutes);

app.get('/test', (req, res) => {
    res.send("Hello world")
})

// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


