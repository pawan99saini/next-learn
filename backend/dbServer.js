const express = require("express")
const cors = require('cors');
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin as needed

//register route
app.use('/api/register', require('./api/register'));

//login route
app.use('/api/login',require('./api/login'))


app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
