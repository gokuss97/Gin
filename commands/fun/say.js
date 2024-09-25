const { CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports.data = {
    name: "say",
    description: "Dùng Bot để nói",
    type: 1, // slash command
    options: [
        {
            name: "query",
            description: "Nhập từ mà bạn muốn Bot nói)",
            type: 3,
            required: false,
        }
    ],
    
    integration_types: [0],
    contexts: [0],
};

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {Object} lang 
 */
module.exports.execute = async (interaction, lang) => {

        const query = interaction.options.getString('query');
        interaction.reply({ content: 'Thao tác thành công!', ephemeral: true });
        interaction.channel.send(query);
    }
