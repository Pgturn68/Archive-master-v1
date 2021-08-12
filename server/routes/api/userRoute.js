const userRouter = require('express').Router();
// Named export
const { User } = require('../../models')

// CRUD -- Create, Read, Update, Delete
userRouter.route('/signup').post((req, res) => {
    console.log("POST User: ", req.body);
    // res.json({ data: "signup endpoint" })

    const user = new User(req.body)
    user.save()
        .then((err) => { 
            if (err) {
                console.log(err)   
            }
            res.json(user)
        })
        .catch((err) => {
            res.sendStatus(500).send(`Error: ${err}`)
         })
})

userRouter.route('/login').post( (req, res) => {
    console.log("POST User: ", req.body);
    //res.json({ data: "login endpoint" })

    User.find({email: req.body.email, password: req.body.password})
        .then((doc) => {
            res.json(doc)
         })
        .catch((err) => {
            console.log(err)
            res.send(err)
         })

    // const user = new User(req.body.data)
    // user.save()
    //     .then((err) => { 
    //         if (err) {
    //             console.log(err)
    //         }
    //         res.json({ data: "data was saved" })
    //     })   
})

userRouter.route('/').get((req, res) => { 
    User.find({}, function(err, docs) {
        if (err) {
            res.status(400).jsong({ error: `An error occurred: ${err}`})
        }

        res.json(docs)
    })

})

userRouter.route('/:id').get((req, res) => {
    User.findById(req.params.id, function (err, doc) {
        if (err) {
            res.status(400).jsong({ error: `An error occurred: ${err}` })
        }

        res.json(doc)
    })

})



userRouter.route('/').put((req, res) => {
    console.log('req.body: ', req.body);
    const newData = {
        firstName: req.body.data.firstName,
        lastName: req.body.data.lastName,   
        email: req.body.data.email,
        password: req.body.data.password
    }
    // res.status(200).json({ update: req.body.data })
    User.findByIdAndUpdate(req.body.data._id, newData, function(err, doc) {
        if (err) {
            console.log(err)
            res.status(400).json({err})
        }

        res.status(200).json({update: "Person updated"})
    })
    

})

userRouter.route('/:id').delete((req, res) => {
    console.log('=================id===================');
    console.log(req.params);
    console.log('=================id===================');
    // res.json({data: "Item deleted"})
    User.findByIdAndDelete(req.params.id)
        .then((response) => {
            res.json({
                resp: response,
                dataResult: "Item Deleted"
            })
         })
        .catch((err) => {
            console.log(err);
            res.json({error: err})
         })
})

module.exports = userRouter