const { Events, Client } = require("discord.js");
const config = require("../config");
const deploy = require("../deploy");
const mongoose = require('mongoose');

module.exports = {
    name: Events.ClientReady,
    type: "events",
    /**
     * 
     * @param { Client } client 
     */
    execute: async (client) => {
        if (config.deploy) {
            await deploy(client);
        }
        if (process.env.MONGO) {
            await mongoose.connect(process.env.MONGO)
                .then(() => {
                    console.log('Connected to MongoDB!');
                    client.db = require("./../utility/mongoDB");
                })
                .catch(err => console.error("MongoDB connection error:", err));
        }

        console.log(`Ready! Logged in as ${client.user.tag}`);

        // Array of statuses to randomly choose from
        const statuses = [
            'online',
            'dnd',
            'idle',
            'invisible'
        ];

        // Randomly select a status
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setStatus(randomStatus);
        console.log(`Bot status set to: ${randomStatus}`);
    }
};