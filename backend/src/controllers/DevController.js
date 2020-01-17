const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);  
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
            let { name, avatar_url, bio } = response.data;
            const techsArray = parseStringAsArray(techs);

            if (!name) { 
                name = response.data.login;
            }
        
            const location = {
                type: 'Point', 
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            // Filtrar as conexões que estão no máximo a 10km de distância 
            // e que o novo dev tenha pelo menos umas das techs filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );

            sendMessage(sendSocketMessageTo, 'newDev', dev);
        };
    
        return res.json(dev);
    },

    async update(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
            let { name, avatar_url, bio } = response.data;
            const techsArray = parseStringAsArray(techs);

            if (!name) { 
                name = response.data.login;
            }

        
            const location = {
                type: 'Point', 
                coordinates: [longitude, latitude],
            };
                    
            dev.name = name;
            dev.avatar_url = avatar_url;
            dev.bio = bio;
            dev.techs = techsArray;
            dev.location = location;

            dev.save();

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );

            sendMessage(sendSocketMessageTo, 'newDev', dev);
        };
    
        return res.json(dev);
    },

    async destroy(req, res) {
        const { github_username } = req.body;

        let dev = await Dev.findOneAndDelete({
            github_username
        });

        return res.json({ dev });
        
    }
};