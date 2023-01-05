//Requiring allowedOrigings from allowOrigins file
const allowedOrigins = require('./allowedOrigins')

//This is 3rd party middleware we will have to follow the rules they set up for there options.
//if (allowedOrigins.indexOf(origin) !== -1 if its not in the allowed origins array they will not have acces to the API also put or no origin(!origin) in the paranthese to be able to use postman or any other apps.
// credentials true will handle header for me
//optionsSuccessStatus is set to 200 so we dont run into any issues because 204 ight run into problems with older browsers
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 