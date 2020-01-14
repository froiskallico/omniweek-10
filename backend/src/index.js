const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://tri:tritec@tri-cluster0-piuhh.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/', (req, res) => {
    return res.json({ message: "hello omnistack!" });
});

app.listen(3333);