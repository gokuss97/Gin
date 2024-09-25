const { CommandInteraction } = require("discord.js");

module.exports.data = {
    name: 'setname',
    description: "Dùng Bot để đổi tên ai đó",
    type: 1, // slash command
    options: [
        {
            name: "query",
            description: "Nhập tên bạn muốn đổi",
            type: 3,
            required: true, // Set to true if you want it to be required
        },
        {
            name: "member",
            description: "Chọn người dùng để đổi tên",
            type: 6, // USER type
            required: false,
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
    // Get the new nickname and the member to change it for
    const newName = interaction.options.getString("query");
    const member = interaction.options.getMember("member") || interaction.member; // Default to the user who invoked the command

    // Check for permissions
    if (!interaction.member.permissions.has("MANAGE_NICKNAMES")) {
        return interaction.reply("Bạn không có quyền đổi tên người khác :>");
    }

    // Check if the member is valid
    if (!member) {
        return interaction.reply("Xin hãy nhập tên thành viên hợp lệ!");
    }

    try {
        await member.setNickname(newName); // Await the setNickname call
        await interaction.reply(`Đã đổi tên ${member.toString()} thành "${newName}"!`);
    } catch (err) {
        console.error(err);
        await interaction.reply(`Tôi không đủ quyền để đổi tên ${member.toString()}!`);
    }
};