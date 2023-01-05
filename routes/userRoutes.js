// requiring express
const express = require('express')
// Defining router 
const router = express.Router()
//requiring users controller from controller
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

//This math the .users this is just the route of that these will direct to a controller these are matched up with CRUD CREATE READ UPDATE DELETE
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router
