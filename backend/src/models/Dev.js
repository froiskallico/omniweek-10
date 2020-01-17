const mongoose = require('mongoose');
const PointSchema = require('./utils/pointSchema');

// index: Lista recursos;
// show: Lista um unico recurso;
// store: Armazenar um recurso;
// update: Alterar um recurso;
// destroy: Deletar um recurso;

const DevSchema = new mongoose.Schema({ 
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
 });

 module.exports = mongoose.model('Dev', DevSchema);  