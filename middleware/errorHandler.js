// //Importing log events from logger.js
const { logEvents } = require('./logger')

//Error handler

//This is going to overwrite the  default express error handling  then it also has the request response and next and now inside of this function, this middleware Log Events function and it's a template literal here including the error name and message and then there's a tab So it has the request method, the URL. Origin and this is going to the error log file. '

//Also going to put console log and log the error stack. This will be a pretty large message inside of our console, several lines worth, but it will give us a lot of details about an error and tell it specifically where it is, which is always helpful. Then I'm going to define a status and this is going to look to see if the response we receive up here as one of the parameters already has a status code set and this is a ternary(?). So if it does have that status code set, then we'll just return that status code. If not, it's going to be a 500 which is a server error. And then we'll set the status to whatever our ternary determined and then we'll have a response that is JSON data and we'll say message and then we'll have the error message.

//Will log errors by name, message, and method to solve it, also will log errors in errLog.log and will give you status of the code
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // server error 

    res.status(status)

    res.json({ message: err.message })
}

module.exports = errorHandler 