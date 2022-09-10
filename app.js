const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const route = require("./routes/router");
const logger = require('./logger')
const dbCon = require("./database/sql_conn");
const swaggerUI = require("swagger-ui-express");
const swagger = require('./swagger')
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.use(route);
// (async function () {
//     await dbCon.connectionPool;
// })();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));

app.use((err, req, res, next) => {
    console.log(err)
    logger.error(err.toString())
    res.status(500).send({ message: 'something went wrong' })
})

app.listen(4002, () => {
    logger.info("server running on port 4002")
    console.log("server running on port 4002")
});

process.on('uncaughtException', function (err) {

    // Handle the error safely
    console.log(err)
    process.exit(1)
})