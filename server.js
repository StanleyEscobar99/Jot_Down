//Requiring .env 
require('dotenv').config()
require('express-async-errors')
//Requring express and defining app
const express = require('express')
const app = express()
//Importing path
const path = require('path')
//Importing logger we created
const { logger, logEvents } = require('./middleware/logger')
//Importing errorhandler
const errorHandler = require('./middleware/errorHandler')
//Importing cookieparser 3rd party middleware
const cookieParser = require('cookie-parser')
//Requiring CORS 
const cors = require('cors')
//Importing CORS options
const corsOptions = require('./config/corsOptions')
//Connecting dbconnect
const connectDB = require('./config/dbConn')
//Requiring Mongoose
const mongoose = require('mongoose')
// Port that server will be ran on process.env.port or locally on port 3500
const PORT = process.env.PORT || 3500


console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)
//Enabling CORS we also pass Options into cors
app.use(cors(corsOptions))

//We need to call this for to let app receive and parse that JSON data
app.use(express.json())

//Applying cookie parser so we can parse cookies we recive as well
app.use(cookieParser())

//Listening for the index of webpage with slash "/" then we call on "path.join" which is a method of path then we call on __dirname which is a global variable that node js understands it's basically saying look inside the folder we're in after that we'll put a comma and then say look inside of the slash public folder.
//What we are telling express to do is to find a static file like a css file or other resources like an image.
app.use('/', express.static(path.join(__dirname, 'public')))

//This line of code is looking for a folder inside of routes named root
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
//Connecting userRoutes/ routes directory
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

// App listen for the server, but here we'll just say App All now will listen for this Asterisk, which essentially means all everything that reaches it to App dot All. Will be put through this instead of being routed to anything that's above.  

// First thing is put the 404 so we can get it right away. 

//inside of this, of this if statement res send file and now this will basically we're going to send our 404 and of course we have to route to it correctly. After that then we go into  an else if statement, here request accepts and let's look for JSON, which would be very common, sent to a rest API. So if there's a JSON request that wasn't routed properly and didn't get stopped by any of the expected routes, this would be the response. response JSON and now inside of this we'll have a message and then will say 404 not found. the last else statement will be sent no matter what if HTML. JSON was not matched in the accept setter and here we'll say response type text is fairly safe. Just about everything can receive text and send once again our 404 not found. 

//checking for all possible outcomes and we will be routing it to a 404 page if request doesn't exist
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

//Listen for errorHandler
app.use(errorHandler)

//Mongoose Connection
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

// error number, the error code, the error system call and the error hostname. All of that should be provided through a MongoDB error.
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})