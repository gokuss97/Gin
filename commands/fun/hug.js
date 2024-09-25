const { EmbedBuilder, CommandInteraction } = require('discord.js');
const hugCounts = {};
module.exports.data = {
    name: "hug",
    description: "Ôm ai đó",
    type: 1, // Slash command
    options: [
        {
            name: "user",
            description: "Chọn người mà bạn muốn ôm",
            type: 6, // User type
            required: false
        },
    ],
    integration_types: [0, 1],
    contexts: [0, 1, 2],
};

/**
 * 
 * @param { CommandInteraction } interaction 
 */
module.exports.execute = async (interaction, lang) => {
    // Reply to confirm the action
    await interaction.reply({ content: 'Thao tác thành công!', ephemeral: true });
    
    // Get the user and amount of hugs (default to 1 if not provided)
    const personHugged = interaction.options.getUser('user') || interaction.user;

    const userId = personHugged.id;
    if (!hugCounts[userId]) {
        hugCounts[userId] = 0;
    }
    hugCounts[userId]++;


    // Array of hug GIFs
    const images = [
        "https://i.pinimg.com/originals/85/dc/ef/85dcef131af84b515106955e142df54e.gif",
        "https://i.pinimg.com/originals/ff/95/42/ff9542a0943d49666130b026f82401fb.gif",
        "https://acegif.com/wp-content/gif/anime-hug-14.gif",
        "https://acegif.com/wp-content/gif/anime-hug-49.gif",
    ];

    // Create the embed
    const embed = new EmbedBuilder()
        .setTitle(`Bạn đang ôm ${personHugged.username} 🤗`)
        .setDescription(`${personHugged.username} đã được ôm ${hugCounts[userId]} lần!`)
        .setImage(images[Math.floor(Math.random() * images.length)]) // Random hug GIF
        .setTimestamp();

    // Send the embed
    await interaction.channel.send({ embeds: [embed] });
};