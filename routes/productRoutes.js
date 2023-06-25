const router = require('express').Router()
const Product = require('../models/Product')
const express = require('express')

router.post('/', async (req, res)=>{
    //req.body
    //create
    const {description,price,amount,available} = req.body
    if(!description){
        res.status(422).json({error:'Description is necessary'})
    }
    else if(!price){
        res.status(422).json({error:'price is necessary'})
    }
    else if(!amount){
        res.status(422).json({error:'amount is necessary'})
    }
    else if(!available){
        res.status(422).json({error:'available is necessary'})
    }
    const product = {
        description,
        price,
        amount,
        available,
    }
    //isnt the best way to know about an error, so you can use logs after
    try{
        //create data
        await Product.create(product)
        res.status(201).json({message:'Product save SUCESS'})
    } catch (error){
        res.status(500).json({error: error })
    }
})
//read
router.get('/', async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error){
        res.status(500).json({error: error })
    }
})
//read by atlas
router.get('/:id', async (req, res)=>{
    const id = req.params.id
    try{
        const product = await Product.findOne({_id:id})
        if(!product){
            res.status(422).json({message:"Product not found"})
        }
        res.status(200).json(product)
    } catch (error){
        res.status(500).json({error: error })
    }
})
//updtade (put,patch)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {description,price,amount,available} = req.body
    const product = {
        description,
        price,
        amount,
        available,
    }
    try{
        const updatedProduct = await Product.updateOne({_id:id}, product)
        if(updatedProduct.matchedCount===0){
            res.status(422).json({message:'Product not found'})
            return
        }
        res.status(200).json(product)
    } catch {
        res.status(500).json({error:error})
    }
})
//delete
router.delete('/:id', async (req, res)=>{
    const id = req.params.id
    const product = await Product.findOne({_id:id})
    if (!product){
        res.status(422).json({message:'Product not found'})
        return
    }
    try {
        await Product.deleteOne({_id:id})
        res.status(200).json({message:'Product delete was made SUCESS'})
    } catch(error){
        res.status(500).json({error:error})
    }
})
module.exports = router