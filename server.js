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

// Handle requests that do not match an existing route
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
