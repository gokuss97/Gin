const { EmbedBuilder, CommandInteraction  } = require('discord.js');
const math = require('mathjs')

module.exports.data = {
name: 'math',
description: 'Dùng bot để tính gì đó',
type: 1, // slash command
options: [
    {
        name: "query",
        description: "Nhập số vào đây",
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
    var question = interaction.options.getString('query');
    interaction.reply({ content: 'Thao tác thành công!', ephemeral: true });
    if(!question) return interaction.channel.send('Vui lòng nhập số để tính')

    let result;
    try {
        result = math.evaluate(question);


    } catch (e) {
        return interaction.channel.send('Đưa số vô lý vkl')
    }


    return interaction.channel.send(`${question} = ${result}`)
}
