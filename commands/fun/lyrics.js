const lyricsFinder = require('lyrics-finder');
const yt = require('yt-search');
const { EmbedBuilder, CommandInteraction } = require('discord.js');

module.exports.data = {
    name: 'lyrics',
    description: 'Tìm lời bài hát trên Google',
    type: 1, // Slash command type
    options: [
        {
            name: "query",
            description: "Hãy nhập tên bài hát",
            type: 3, // String type
            required: true, // Make this field required to avoid null searches
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
    // Extract the query from the slash command options
    const query = interaction.options.getString('query');
    
    // Defer the reply while fetching the data
    await interaction.deferReply();
    
    // Create the embed message structure
    let embed = new EmbedBuilder()
        .setColor('#FF4500')
        .setFooter({ text: `Được yêu cầu bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    try {
        // Search for lyrics
        let lyric = await lyricsFinder("", query); // Searching for the lyrics on Google
        let noLyric = false; // Indicator for no lyrics

        // Check if lyrics are found
        if (!lyric) {
            lyric = `Không tìm thấy lời bài hát: **${query}**`; // Handle no lyrics found
            noLyric = true;
        }

        // Set the lyrics or trim if too long for an embed
        embed.setDescription(lyric.length >= 4093 ? lyric.substring(0, 4093) + '...' : lyric);

        // If lyrics exist, search YouTube for the song
        if (!noLyric) {
            const res = await yt.search(query); // Search the song on YouTube
            const song = res.videos.length > 0 ? res.videos[0] : null; // Choose the first result
            
            if (song) {
                embed.setTitle(song.title)
                    .setURL(song.url)
                    .setThumbnail(song.image); // Add YouTube video details
            }
        }
    } catch (error) {
        console.error(error); // Log the error
        embed.setDescription(`Đã xảy ra lỗi khi tìm lời bài hát hoặc video cho **${query}**.`);
    }

    // Edit the deferred reply with the embed
    await interaction.editReply({ embeds: [embed] });
};