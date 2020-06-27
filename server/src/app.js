const express = require('express');
const bodyParser = require('body-parser')

//run mongo config
require('./db/mongooseConfig')

const adminRouter = require('./router/adminRouter')


const app = express()

const port = process.env.PORT

app.use(bodyParser.json())
app.use(adminRouter)

app.listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log('App listen on port', port)
})


process.on('SIGINT', () => { console.log("App shuts down"); process.exit(); });
