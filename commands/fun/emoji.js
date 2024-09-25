const { EmbedBuilder, CommandInteraction, parseEmoji, ApplicationCommandOptionType } = require('discord.js');
const { parse } = require('twemoji-parser');

module.exports.data = {
    name: 'emoji',
    description: 'Phóng to Emoji',
    type: 1, // slash command
    options: [{
        name: "query",
        description: "Chọn Emoji bạn muốn phóng to",
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    integration_types: [0, 1],
    contexts: [0, 1, 2],
};

/**
 * 
 * @param { CommandInteraction } interaction 
 */
module.exports.execute = async (interaction, lang) => {
    interaction.reply({ content: 'Đã phóng to Emoji thành công ', ephemeral: true });
    const emoji = interaction.options.getString('query');
    if (!emoji) return interaction.channel.send("Hãy nhập emoji đi bạn!");

    let custom = parseEmoji(emoji);
    const embed = new EmbedBuilder()
        .setTitle(`Phiên bản Emoji siêu to khủng lồ: ${emoji}`)
        .setColor("#00FF00"); // You can use a custom color here

    if (custom && custom.id) {
        let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
        embed.setImage(link)
            .setFooter({ text: `Emoji ID: ${custom.id}` })
            .setDescription(`[Tải xuống emoji này](${link})`); // Adding the download link
            return interaction.channel.send({ embeds: [embed]}); // Send as an ephemeral message
    } else {
        let parsed = parse(emoji, { assetType: 'png' });
        if (!parsed[0]) {
            return interaction.channel.send({ content: 'Emoji không hợp lệ~!', });
        }
        let link = parsed[0].url;
        embed.setImage(link)
            .setDescription(`[Tải xuống emoji này](${link})`); // Adding the download link
            return interaction.channel.send({ embeds: [embed] });
    }
};