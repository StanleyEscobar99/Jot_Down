//Destructure Format from our date FNS dependency
const { format } = require('date-fns')
//Destructure V4 and renaming it uuid it's coming from our UUID dependency
const { v4: uuid } = require('uuid')
//Requring FS module for the file system so that comes directly from Node
const fs = require('fs')
//Requiring FS promises
const fsPromises = require('fs').promises
//Requiring path
const path = require('path')

//Creating a date time variable
//This is a template literal and inside this template literal there's a new date date object and then I'm formatting it year, month, day and then hour, minute, seconds. Anytime a log message is being created I'll recieve the date and time.

//logItem
//Pass in the datetime variable, also the \t makes logs easier to export if we wanted to excel or something similiar then calling UUID here which creates a specific ID for each log item. Then we log the actual message after that the /n creates a new line every log will be on it's own line.

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

//Now a TRY to check if the directory exists if it does we will use path.join and exit folder and look for logs folder, if that doesn't exist one will need to be created. So then we use Await fsPromises . mkdir to make a directory if one doesnt exist it will be created.
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
//Now we will be appending/sending logs to our log file the path, the directory name, two dots to go up out logs. So we're in that logs directory, then the file name itself and then the item to log to the file. 
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

//The middleware 
// assing in this template literal here that has the request method, a tab, the request URL, another tab. There should be tabs between all and then the origin, what the URL where the request originated from and we're writing that all to the request log. Log which is like a text file but that's the convention for writing logs and you can open it like a text file
//This would log every request that comes in
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }