const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

//run mongo config
require('./db/mongooseConfig')

const adminRouter = require('./router/adminRouter')
const photoRouter = require('./router/photoRouter')
const categoryRouter = require('./router/categoryRouter')

const app = express()

const port = process.env.PORT

app.use(cors({origin: 'http://localhost:4200'}))
app.use(bodyParser.json())
app.use(adminRouter)
app.use(photoRouter)
app.use(categoryRouter)

app.listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log('App listen on port', port)
})


process.on('SIGINT', () => { console.log("App shuts down"); process.exit(); });
