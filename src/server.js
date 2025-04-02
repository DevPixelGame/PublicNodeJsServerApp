const express = require("express")
const cors = require('cors');

const bodyParser = require("body-parser")
const app = express();
//const fs = require('fs');
const http = require('http')
//const https = require('https')
const PORT = 8080;
const logger = require('./utils/logger')
let isDisableKeepAlive = false
var requestIp = require('request-ip');

var moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

const server = http.createServer(app)


const helmet = require('helmet');

app.use(cors());
app.use(helmet());
// app.use(bodyParser.raw({inflate:true, limit: '50mb', type: 'application/json'}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({
//     limit : "50mb"
// }));


// app.use(bodyParser.raw({inflate:true, limit: '50mb', type: 'application/json'}));
// app.use(bodyParser.urlencoded({
//     limit:"50mb",
//     extended: false
// }));

require('./routes/timeRoutes')(app)
require('./routes/userRoutes')(app)
require('./routes/accessTestRoutes')(app)
require('./routes/healthCheckRoutes')(app)
require('./routes/logRoutes')(app)


app.use(function(req, res, next) {
    logger.http(`** access log: ${requestIp.getClientIp(req)} // url: ${req.url}`)
    
    if (isDisableKeepAlive) {
        res.set('Connection', 'close')
    }

    next()
})



server.listen(PORT, () => {
    // server.close(function () {
    //     console.log('******* Server Closed ********')
    //     process.exit(0)
    // })

    // starting code

    // logger.info('******* Server Started ********')
    // logger.info('******* Server Started 2222********')
    // logger.debug('***** tttt ****')
    
    process.send('ready')
    console.log("Server listening on PORT", PORT)
});

process.on("SIGINT", function () {
    isDisableKeepAlive = true
    server.close(function () {
        logger.info('******* Server Closed ********')
        process.exit(0)
    })
})




// app.post('/api/logs/create', (req, res) => {
//     console.log("Received POST request at /api/logs/create");
//     console.log("Request Body:", req.body);

//     if (!req.body.userId || !req.body.type || !req.body.message) {
//         return res.status(400).json({ error: "Missing required fields" });
//     }

//     res.json({
//         success: true,
//         message: "Log received successfully",
//         data: req.body
//     });
// });
