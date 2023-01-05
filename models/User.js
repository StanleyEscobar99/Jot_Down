//Require Mongoose
const mongoose = require('mongoose')

//creating a schema that will allow us to have a data model. 
//const user schema and set this equal to a new mongoose schema. The data model requires all the different type of data that will be required
//Username and password are a must I also put roles to roles because the app will have different accesses depending on your role. Also an active boolean to see if user is active. Basically your active status can be changed by a manager or admin
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)