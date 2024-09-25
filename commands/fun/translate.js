const { CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const translate = require('google-translate-api');
module.exports.data = {
    name: "translate",
    description: "GG dịch (Đang lỗi đừng dùng)",
    type: 1, // slash command
    options: [
        {
            name: "query",
            description: "Nhập từ mà bạn muốn dịch)",
            type: 3,
            required: false,
        }
    ],
    
    integration_types: [0],
    contexts: [0],
};

/**
 * 
/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {Object} lang 
 */
module.exports.execute = async (interaction) => {
    // Get the query string from interaction options
    const query = interaction.options.getString('query');

    // Check if query is valid
    if (!query || query.trim() === '') {
        return await interaction.reply({ content: 'Bạn chưa nhập từ nào để dịch.', ephemeral: true });
    }

    // Respond immediately to confirm the command was received
    await interaction.reply({ content: 'Đang chạy...', ephemeral: true });

    // Perform translation
    try {
        const res = await translate(query, { to: 'vi' }); // Translate to Vietnamese
        // Send the translated text as a follow-up message
        await interaction.followUp({ content: `Dịch: ${res.text}` });
    } catch (err) {
        // Handle any errors that occur during translation
        await interaction.followUp({ content: 'Đã xảy ra lỗi khi dịch 😢' });
        console.error(err); // Log the error for debugging
    }
};