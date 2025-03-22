require("dotenv").config()//התקנת DOTENV
const express=require("express")//חבילת אקספרס
const cors=require("cors") //חבילת CORS
const mongoose = require('mongoose') //חבילת מונגוס - להתחבר לדטה
const corsOptions = require("./config/corsOptions")//ייבוא של הרשימה לבנה
const connectDB = require("./config/dbConn")//פונקצית החיבור לDB 
const PORT = process.env.PORT|| 1234 //הגדרת הפורט
const app = express() //הפעלת הפונקציה למשתנה APP
connectDB() //קריאה לפונקציה שמפעילה את הDB
app.use(cors(corsOptions))// הפעלת רשימה לבנה
app.use(express.json())// היכולת לעשות PUT וPOST

app.use('/api/user',require('./routers/userroute'))
app.use('/api/post',require('./routers/postroute'))
app.use('/api/todo/',require('./routers/todoroute'))
app.use('/api/photo/',require('./routers/photoroute'))
mongoose.connection.once('open', () => {//פונקציה לבדיקה שיש חיבור כל הזמן
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
    })
    mongoose.connection.on('error', err => {
    console.log(err)
    })