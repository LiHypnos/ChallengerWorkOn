const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
//dbdate
const dbUSER = process.env.dbUSER
const dbPASSWORD = encodeURIComponent(process.env.dbPASSWORD)
//reding JSON // middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())
//API routes
const productRoutes = require('./routes/productRoutes')
app.use('/product', productRoutes)
//start route / endpoint
app.get('/',(req ,res)=>{
    res.json({message: 'Hello, gymbro!'})
})
//mongodb+srv://Elian:128570@apicluster0.jbe4noi.mongodb.net/API?retryWrites=true&w=majority

//gived door
mongoose.connect(
    `mongodb+srv://${dbUSER}:${dbPASSWORD}@apicluster0.jbe4noi.mongodb.net/API?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log("connected to mongodb SUCESS")
        app.listen(3000)
    })
    .catch((err) => console.log(err))
