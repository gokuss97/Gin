const { Events, GuildMember, AttachmentBuilder } = require("discord.js");
const config = require("../config");
const { GreetingsCard } = require("../utility/GreetingsCard")
module.exports = {
    name: Events.GuildMemberAdd,
    type: "events",
    /**
     * 
     * @param { GuildMember } member 
     */
    execute: async (member) => {
        const card = new GreetingsCard()
  .setAvatar(member.user.displayAvatarURL({ size: 1024, forceStatic: true, extension: "png" }))
  .setDisplayName(member.user.username)
  .setImage ("https://cdn.discordapp.com/attachments/1087055732857389156/1276421572575367270/3214377.jpg?ex=66c977b9&is=66c82639&hm=8dc0f2002c836bfb6ea5360d41fa5fb4b287665ea3bf98d16c93912708067a30&")
  .setType("welcome")
  .setMessage(`Chào mứng ${member.user} đến với server Big Cat!`);

  const image = await card.build({ format: "png" });
  const attachment = new AttachmentBuilder(image, { name: "GreetingsCard.png"})
  const channel = member.client.channels.cache.get("980433133495271484")
   await channel.send({ files: [attachment]});


    }
}
