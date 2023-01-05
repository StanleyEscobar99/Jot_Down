// requiring express
const express = require('express')
// Defining router 
const router = express.Router()
//requiring path
const path = require('path')

//This is a get request that relates directly back to our Http methods
//the first thing I'm going to type is the carrot ^ and that says at the beginning the string only. And then we'll put a slash and then the dollar sign $ which says at the end of the string only. So that means this will only match if the requested route is only a slash and that would be for the root also a slash index because maybe they would request more than just the slash as they put that in. After the index we make html optional So they could request, just the slash or maybe just the slash index without the HTML or the user could request the full index HTML

//Then we'll have a request and a response for our function And then inside the function we will send the file back so it'll be response sendfile. Then we'll say path join and we'll use that dirname directory name variable that Node JS recognizes. And now we need to tell it where to find the file. And the file is going to be up out of the routes folder so that's what the two dots indicate. And then we're going to tell it to look into a views folder and then we're going to have it look for the index HTML file. 

//THIS IS OUR ROUTER GIT AND IT WILL GET THE INDEX HTML FILE IF IT MATCHES ANY OF THOSE 3 '..', 'views', 'index.html'
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router