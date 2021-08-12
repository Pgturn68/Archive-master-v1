const tripRouter = require('express').Router();
// Named export
const { Trip } = require('../../models')
const cloudinary = require('../../cloudinaryconfig')

// CRUD -- Create, Read, Update, Delete
tripRouter.route('/').get((req, res) => {
    Trip.find({}, function (err, docs) {
        if (err) {
            res.status(400).jsong({ error: `An error occurred: ${err}` })
        }

        res.json(docs)
    })

})

tripRouter.route('/:id').get((req, res) => {
    Trip.find({userId: req.params.id}, function (err, docs) {
        if (err) {
            res.status(400).jsong({ error: `An error occurred: ${err}` })
        }

        res.json(docs)
    })

})

tripRouter.route('/').post(async (req, res) => {
    console.log('==============body FORMDATA======================');
    console.log("req.files", req.files);
    console.log("req.body: ", req.body)
    console.log('===============body=====================');
  //  res.json({ test: "Testing image upload" })

   try {
       const imgArray = []
       for (const file of req.files) {
           const result = await cloudinary.uploader.upload(file.path);
           console.log('=================result===================');
           console.log(result.secure_url);
           console.log('================result====================');
           await imgArray.push(result.secure_url)
       }

       console.log("imgArray: ", imgArray)

       const trip = new Trip({
           category: req.body.category,
           title: req.body.title,
           details: req.body.details,
           userId: req.body.userId,
           images: [...imgArray]
       })

       trip.save()
           .then((err) => {
               if (err) {
                   console.log(err)
               }
               res.json(trip)
           })
           .catch((err) => {
               res.sendStatus(500).send(`Error: ${err}`)
           })
        
    }  catch(err) {
       res.sendStatus(500).send(`Error: ${err}`)
   }

})

tripRouter.route('/').put((req, res) => {
    console.log('req.body: ', req.body);
    const newData = {
        title: req.body.data.title,
        details: req.body.data.details,
        category: req.body.data.category,
    }
    // res.status(200).json({ update: req.body.data })
    Trip.findByIdAndUpdate(req.body.data._id, newData, function (err, doc) {
        if (err) {
            console.log(err)
            res.status(400).json({ err })
        }

        res.status(200).json({ update: "Person updated" })
    })


})

tripRouter.route('/:id').delete((req, res) => {
    console.log('=================id===================');
    console.log(req.params);
    console.log('=================id===================');
    // res.json({data: "Item deleted"})
    Trip.findByIdAndDelete(req.params.id)
        .then((response) => {
            res.json({
                resp: response,
                dataResult: "Item Deleted"
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: err })
        })
})

module.exports = tripRouter