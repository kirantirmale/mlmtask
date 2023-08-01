const fs = require("fs");
const user = require('../models/user');
exports.getdata = async (req, res) => {
    try {
        let data = await user.find()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({message: error.message})
    }
}
exports.adddata = async (req, res) => {
    try {
        console.log("req.body",req.body)
        let data = await user.create(req.body)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({message: error.message})
    }
}
exports.getonedata = async (req, res) => {
    try {
        console.log("req.body",req.body)
        let data = await user.findOne({_id:req.query.id})
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({message: error.message})
    }
}
exports.updatedata = async (req, res) => {
    try {
        console.log("req.body",req.body)
        let data = await user.updateOne({_id:req.query.id},{$set:req.body})
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({message: error.message})
    }
}
exports.deletedata = async (req, res) => {
    try {
        console.log("req.body",req.body)
        let data = await user.deleteOne({_id:req.query.id})
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({message: error.message})
    }
}