
const { Events, Message } = require("discord.js");

module.exports = {
    name: Events.MessageCreate, // Updated to use MessageCreate event
    type: "events",
    /**
     * 
     * @param {Message} message
     */
    execute: async (message) => {
        if (message.author.bot) return; // Ignore bot messages

        const responses = {
          'Buổi tối vui vẻ': 'Oke. buổi tối vui vẻ',
          'Buổi trưa vui vẻ': 'Ừm, You yoo',
          'Hello': 'Lo!',
          'Gin': 'Nhắn tên gì bố',
          'Sim là ai': 'Là người tạch toán cao cấp!',
          'Im here, can you be quiet Shana': 'Bot rách. Shut up!',
          'Dead chat': 'Bruh, tôi sẽ đấm cậu vỡ mồm',
          'back hurt': 'Who care :v',
          'Dead': 'Server không dead. Nó chỉ im lặng tí thôi...',
          'Dead kênh': 'Bruh, Shana sẽ đấm cậu vỡ mồm',
          'Death': 'Bruh, Shana sẽ đấm cậu vỡ mồm',
          'dead chat': 'Bruh, Shana sẽ đấm cậu vỡ mồm',
          'Cat là ai': 'Shana đang nghi vấn là một tên lolicon-hentai sama!',
          'Probot': 'Sao mà bằng được Shana-chan ><',
          'Sim': 'Là tên tạch toán cao cấp',
          'Cat': 'Shana nghĩ hắn là một tên lolicon hentai sama'
      };

      // Check for exact matches
      if (responses[message.content]) {
          message.reply(responses[message.content]);
      } else {
          // Check for partial matches
          for (const key of Object.keys(responses)) {
              if (message.content.includes(key)) {
                  message.channel.send(responses[key]);
                  break; // Stop checking after the first match
              }
          }
      }
  }
};