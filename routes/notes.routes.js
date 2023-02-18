
const express = require("express")
const { NoteModel } = require("../modules/note.module.js")

const noteRoutes = express.Router()

noteRoutes.get("/",async(req,res)=>{
    let data = await NoteModel.find()
    res.send(data)
})

noteRoutes.post("/create",async(req,res)=>{
    let data = req.body
    try{
        let note = new NoteModel(data)
        await note.save()
        res.send({msg:"note created"})
    }catch(err){
        res.send({msg:"note Not created"})
    }
})
noteRoutes.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    let payload = req.body
    try{
        await NoteModel.findByIdAndUpdate(id,payload)
        res.send({msg:"note updated"})
    }catch(err){
        res.send({msg:"note Not update"})
    }
})
noteRoutes.delete("/delete/:id",async(req,res)=>{
    let id = req.params.id

    try{
       await NoteModel.findByIdAndDelete(id)
        res.send({msg:"note deleted"})
    }catch(err){
        res.send({msg:"note Not delete"})
    }
})
module.exports = {noteRoutes}