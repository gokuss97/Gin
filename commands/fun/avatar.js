const { CommandInteraction } = require("discord.js");

module.exports.data = {
    name: "avatar",
    description: "Xem ảnh đại diện của ai đó",
    type: 1, // slash command
    options: [{
        name: "user",
        description: "Chọn người dùng để xem avatar",
        type: 6,
        required: false
    }],
};

/**
 * 
 * @param { CommandInteraction } interaction 
 */
module.exports.execute = async (interaction, lang) => {
    await interaction.deferReply(); // Defer the reply

    const user = interaction.options.getUser("user") || interaction.user;

    // Construct the avatar URL
    const avatarURL = user.displayAvatarURL({ size: 1024, dynamic: true });

    // Reply with the avatar URL in an embed
    await interaction.editReply({ 
        content: `${user.username}avatar:`,
        embeds: [{
            image: { url: avatarURL }
        }]
    });

    // Send a message with the download link
    await interaction.followUp(`Bạn có thể tải ảnh đại diện ở đây(${avatarURL}).`);
};