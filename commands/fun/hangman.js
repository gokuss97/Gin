const hangman = require('discord-hangman');
const { EmbedBuilder, CommandInteraction } = require('discord.js');


module.exports.data = {
    name: "hangman",
    description: "Test (Đang lỗi đừng dùng)",
    type: 1, // Slash command
    options: [],
    integration_types: [0, 1],
    contexts: [0, 1, 2],
};

/**
 * 
 * @param {CommandInteraction} interaction 
 */
module.exports.execute = async (interaction) => {
    // Start the Hangman game
    try {
        const gameData = await hangman.create(interaction, 'random', {
            word: 'discord', // You can use 'random' to select a random word from the library
            players: interaction.guild.members.cache.filter(member => !member.user.bot).map(member => member.user), // Include all non-bot members
            lives: 10, // Number of lives
            displayWordOnGameOver: false, // Do not display the word on game over
        });

        // Check if the game started successfully
        if (!gameData.game) {
            return interaction.reply({ content: "Could not start the game. Please try again.", ephemeral: true });
        }

        // Handle the game outcomes
        if (gameData.game.status === 'won') {
            interaction.reply({ content: `🎉 Chúc mừng, ${gameData.selector ? gameData.selector.username : 'you'} đã chiến thắng!` });
        } else if (gameData.game.status === 'lost') {
            interaction.reply({ content: `😢 ${gameData.selector ? gameData.selector.username : 'You'} GG! Từ đã đúng là ${gameData.game.word}.` });
        } else {
            interaction.reply({ content: '⏳ Game đã đóng lại sau 15 phút!' });
        }
    } catch (error) {
        console.error(error); // Log any errors for debugging
        interaction.reply({ content: "Đã xảy ra lỗi khi khởi động game. Vui lòng thử lại sau!", ephemeral: true });
    }
};