const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//import EbookSchema
var Ebooks  = require('../model/EbookSchema');

// => localhost:3000//

//Find All Books
router.get('/', (req, res) => {
    Ebooks.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { res.send('Error in Retriving Ebooks :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Get Book Using ID
router.get('/:id', (req, res) => {

    Ebooks.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Retriving Ebooks :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Sorting The Books
router.get('/sort', async(req,res)=>{
    try{
        const sort = await Ebooks.find({}).sort({price:1});
        res.send(sort);   
    }catch(err){
        res.send(err)
    }
});

//Create New Books
router.post('/create', async(req, res) => {

    const checkISBN = await Ebooks.find({ISBN:req.body.ISBN});
    if(checkISBN) return res.send("This ISBN Already is Exist");

    var books = new Ebooks({
        
        name: req.body.name,
        author: req.body.author,
        ratings: req.body.ratings,
        volume: req.body.volume,
        ISBN: req.body.ISBN,
        price: req.body.price,
        page : req.body.page
        
    });
    //Save The Books Details In Database
    books.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Ebooks Save :' + JSON.stringify(err)); }
    });
});

//Update The Books Using ID
router.patch('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var Ebook = {

        name: req.body.name,
        author: req.body.author,
        ratings: req.body.ratings,
        volume: req.body.volume,
        ISBN: req.body.ISBN,
        price: req.body.price,
        page: req.body.page
        
    };
    Ebooks.findByIdAndUpdate(req.params.id, { $set: Ebook }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Ebooks Update :' + JSON.stringify(err)); }
    });
});

//Delete The Books Using ID
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Ebooks.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send('Error in Ebooks Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


//Import The Router
module.exports = router;