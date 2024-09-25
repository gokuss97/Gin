const { CommandInteraction } = require("discord.js");
const { getAudioUrl } = require('google-tts-api');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports.data = {
    name: 'speak',
    description: 'Bot sẽ nói những gì bạn nhập!',
    options: [
        {
            name: 'text',
            description: 'Văn bản bạn muốn dùng bot nói thay',
            type: 3, // STRING
            required: true,
        },
    ],
};

/**
 * 
 * @param {CommandInteraction} interaction 
 */
module.exports.execute = async (interaction) => {
    const text = interaction.options.getString('text');

    if (text.length > 200) {
        return interaction.reply('Hãy nhập dưới 200 từ nhé.');
    }

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
        return interaction.reply('Bạn hãy ở kênh voice để dùng lệnh ạ!');
    }

    const audioURL = await getAudioUrl(text, {
        lang: 'vi',
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
    });

    try {
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(audioURL);

        player.play(resource);
        connection.subscribe(player);

        player.on('finish', () => {
            connection.destroy();
        });

        interaction.reply({ content: 'Bot đang nói...', ephemeral: true });
    } catch (e) {
        console.error(e);
        interaction.reply('Bot không hiểu bạn nói, xin hãy nói lại đi');
    }
};