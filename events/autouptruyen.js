const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
    name: Events.autouptruyen,
    type: "events",
    /**
     * 
     * @param { Error } error 
     */
    execute: async (error) => {
        console.log(error.message)
    }
}