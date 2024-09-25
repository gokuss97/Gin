const { CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports.data = {
    name: "clear", 
    description: "Xóa tin nhắn",
    type: 1, // slash command
    options: [
        {
            name: "query",
            description: "Nhập số lượng tin muốn xóa (nhớ +1 vd: muốn xóa là 6 thì nhập là 7)",
            type: 3,
            required: false,
        }
    ],
    integration_types: [0],
    contexts: [0],
};

/**
 * 
 * @param {CommandInteraction} interaction 
 */
module.exports.execute = async (interaction) => {
        interaction.reply({ content: 'Thao tác thành công!', ephemeral: true });
        const amount = interaction.options.getString("query");
    if(!interaction.member.permissions.has("868329213877420053")) return interaction.channel.send("Bạn không có quyền dùng lệnh");
    if (!amount) return interaction.channel.send ('Hãy nhập xố dòng muốn xóa');
    if (amount > 100 || amount < 1) return interaction.channel.send('Xin hãy nhập số từ 1 đến 100!');

    interaction.channel.bulkDelete(amount).catch(err => {
        interaction.channel.send ('Discord không cho phép xóa tin nhắn hơn 14 ngày')
    })


}


