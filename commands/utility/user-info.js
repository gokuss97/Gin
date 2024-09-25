const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports.data = {
    name: 'user-info',
    description: 'Kiểm tra thông tin thành viên',
    options: [
        {
            name: 'user',
            description: 'Thành viên bạn muốn check thông tin.',
            type: 6, // USER type
            required: false,
        },
    ],
};

/**
 * 
 * @param {CommandInteraction} interaction 
 */
module.exports.execute = async (interaction) => {
    if(!interaction.member.permissions.has("1286802571562061948")) return interaction.channel.send("Bạn không có quyền dùng lệnh");
    const user = interaction.options.getUser('user') 
        ? await interaction.guild.members.fetch(interaction.options.getUser('user').id) 
        : interaction.member;

    let status;
    switch (user.presence?.status) {
        case 'online':
            status = '<:online:993046779413143632> online';
            break;
        case 'dnd':
            status = '<:dnd:993046930693304371> dnd';
            break;
        case 'idle':
            status = '<:idle:993046882605604894> idle';
            break;
        case 'offline':
            status = '<:offline:993046833125412864> offline';
            break;
        default:
            status = 'Unknown';
    }

    const embed = new EmbedBuilder()
        .setTitle(`${user.user.username}`)
        .setColor('#f3f3f3')
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: 'Tên:',
                value: user.user.username,
                inline: true,
            },
            {
                name: '#️⃣ ID gốc:',
                value: `#${user.user.discriminator}`,
                inline: true,
            },
            {
                name: '🆔 ID:',
                value: user.user.id,
            },
            {
                name: 'Trạng thái hiện tại:',
                value: status,
                inline: true,
            },
            {
                name: 'Activity:',
                value: user.presence?.activities[0] ? user.presence.activities[0].name : 'User isn\'t playing a game!',
                inline: true,
            },
            {
                name: 'Avatar link:',
                value: `[Click Here](${user.user.displayAvatarURL()})`,
            },
            {
                name: 'Ngày tạo tài khoản:',
                value: user.user.createdAt.toLocaleDateString('en-US'),
                inline: true,
            },
            {
                name: 'Ngày tham gia:',
                value: user.joinedAt.toLocaleDateString('en-US'),
                inline: true,
            },
            {
                name: 'Quyền thành viên:',
                value: user.roles.cache.size ? user.roles.cache.map(role => role.toString()).join(', ') : 'No roles',
                inline: true,
            },
        );

    await interaction.reply({ embeds: [embed] });
};
