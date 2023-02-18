const express = require("express")
const { database } = require("./configs/db")
const { auth } = require("./middleware/authentication.middleware")
const { noteRoutes } = require("./routes/notes.routes")
const { userRoutes } = require("./routes/user.routes")
const cors = require("cors")
require("dotenv").config()


const app = express()
app.use(cors())
app.use(express.json())

app.use("/user",userRoutes)
app.use(auth)
app.use("/note",noteRoutes)
app.get("/",(req,res)=>{
    res.send("welcome to React fullstack Note app")
})

app.listen(process.env.port,async()=>{
    try {
        await database
        console.log("connected to database")
    } catch (err) {
        console.log(err)
    }
    console.log(`server is running on http://localhost:${process.env.port}/`)
})

