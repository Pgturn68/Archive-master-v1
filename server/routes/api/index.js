const router = require('express').Router()
const tripRoutes = require('./tripRoutes')
const userRoute = require('./userRoute')

router.use('/trip', tripRoutes)
router.use('/user', userRoute)

module.exports = router;