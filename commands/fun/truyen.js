const { client, EmbedBuilder, CommandInteraction } = require('discord.js');

module.exports.data = {
  data: EmbedBuilder,
  name: "truyen",
  description: "Chỉ những ai có role nhất định ms đc dùng",
  type: 1, // slash command
    options: [],
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}
/**
 * 
 * @param { CommandInteraction } interaction 
 */
      
module.exports.execute = async (interaction) => {
    if (!interaction.member.permissions.has("868329213877420053")) return interaction.channel.send({ content: "Bạn không có quyền để sử dụng lệnh này", ephemeral: true });
    const roleID = "931573408028844092";
    const exampleEmbed = {
      color: 0x0099ff,
      title: 'Sakura Sensei "AAAH, phiền thật - Oneshot"',
      url: 'https://hentaihvn.tv/37708-doc-truyen-sakura-sensei-aaah-phien-that.html',
      author: {
        name: 'Gokuss97',
        icon_url: 'https://s.upanh.net/2024/08/25/user-270246.webp',
        url: 'https://hentaihvn.tv/user-270246',
      },
      fields: [
        {
          name: 'Tác giả',
          value: 'Tukamori Syuuji',
        },
        {
          name: '\u200b',
          value: '\u200b',
          inline: false,
        },

        {
          name: 'Thể loại',
          value: 'BBM, Big Boobs, BlowJobs,...',
          inline: true,
        },


        {
          name: 'Thực hiện',
          value: 'Master•Wind',
          inline: true,
        },
      ],
      image: {
        url: 'https://s.upanh.net/2024/08/25/1.png',
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Ngày đăng',
      },
    };
    
    interaction.channel.send({ embeds: [exampleEmbed] });
    interaction.channel.send(`<@&${roleID}>`);
  }