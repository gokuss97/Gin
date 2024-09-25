const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Anilist = require('anilist-node');
const anilist = new Anilist();

module.exports.data = {
  name: 'animesearch',
  description: 'Thông tin về anime bạn muốn tìm',
  options: [{ 
      name: 'anime',
      description: 'Nhập tên bộ anime',
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
    interaction.reply({ content: 'Thao tác thành công!', ephemeral: true });
    const anime_name = interaction.options.getString('anime');
    if (anime_name == undefined) return interaction.reply('LỖI\nlệnh');

    const search = await anilist.search('anime', anime_name);
    if (typeof search.media[0] == 'undefined') return interaction.channel.send(`Không tìm thấy ${anime}`);
    const anime = await anilist.media.anime(search.media[0].id);

    let animeDescription = anime.description.replace(/<[^>]*>?/gm, '');
    if (animeDescription.length > 1024)
      animeDescription = `${anime.description.replace(/<[^>]*>?/gm, '').substring(0, 1020)}...`;

    if (!interaction.channel.nsfw && anime.isAdult) {
      interaction.channel.send({
        embeds: [
            new EmbedBuilder()
            .setColor('RED')
            .setDescription(
              'Bộ anime này 18+.\nĐể xem bạn cần đủ tuổi và vào channel NSFW'
            )
            .setImage('https://i.imgur.com/oe4iK5i.gif')
        ],
        ephemeral: true
      });
    } else {
      interaction.channel.send({
        embeds: [
            new EmbedBuilder()
            .setColor('#FF4500')
            .setTitle(anime.title.english || anime.title.native || anime.title.romaji)
            .setURL(anime.siteUrl)
            .setImage(`https://img.anili.st/media/${anime.id}`)
            .setThumbnail(anime.coverImage.large)
            .addFields({ name:'Romaji Name',value: `${anime.title.romaji}`,  inline: true })
            .addFields({ name:'English Name',value: `${anime.title.english}`,  inline: true })
            .addFields({ name:'Native Name',value: `${anime.title.native}`,  inline: true })
            .addFields({ name:'Country of Origin', value:`${anime.countryOfOrigin}`,  inline: true })
            .addFields({ name:'Total Episodes',value: `${anime.episodes}`,  inline: true })
            .addFields({ name:'Episodes Duration',value: `${anime.duration}`,  inline: true })
            .addFields({ name:'Contains Adult Content',value: `${anime.isAdult ? 'Yes' : 'No'}`,  inline: true })
        ]
      });


    }}
  