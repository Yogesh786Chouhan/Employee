const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
require('./Models/db');
const EmployeeRouter = require('./Routes/EmployeeRoutes')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.send("Employee data home ")
// });
app.use('/api/employees', EmployeeRouter);
app.listen(PORT, () => {
    console.log(`Server is ruuning on port ${PORT}`)
})