const axios = require('axios');
const cheerio = require('cheerio');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js'); // Use EmbedBuilder for v14+

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkteam')
        .setDescription('Kiểm tra thông tin nhóm.')
        .addStringOption(option => 
            option.setName('group').setDescription('Tên nhóm').setRequired(true)),

            async execute(interaction) {
                const group = interaction.options.getString('group');
            
                // Validate the group name
                if (!/^[a-zA-Z0-9-]+$/.test(group)) {
                    await interaction.reply({ content: 'Tên nhóm không hợp lệ.', ephemeral: true });
                    return;
                }
            
                const url = `https://hentaihvn.tv/g/${group}`;
            
                try {
                    await interaction.reply({ content: 'Đang lấy thông tin nhóm...', ephemeral: true }); // Loading message
                    const response = await axios.get(url);
            
                    if (response.status !== 200) {
                        await interaction.followUp({ content: `Không thể lấy thông tin từ ${url}.`, ephemeral: true });
                        return;
                    }
            
                    const $ = cheerio.load(response.data);
            
                    // Extract data with default values
                    const imgSrc = $('.ul-list-info img').attr('src') || 'default_image_url.png';
                    const title = $('.ul-list-info h2').text() || 'Không tìm thấy tên nhóm';
                    const description = $('.ul-list-info > li > p').eq(0).text().trim() || 'Không có mô tả.';
                    const leader = $('.ul-list-info .leader-nhom').eq(0).text() || 'Không có';
                    const deputy = $('.ul-list-info .leader-nhom').eq(1).text() || 'Không có';
                    const likes = $('.ul-list-info .face-nhom').eq(2).text() || '0';
                    const budget = $('.ul-list-info .face-nhom').eq(3).text() || '0';
                    const topWeek = $('.ul-list-info .face-nhom').eq(4).text() || '0';
                    const discordLink = $('.ul-list-info .face-nhom').eq(1).find('a').attr('href') || 'Không có Discord.';
                    const facebookLink = $('.ul-list-info .face-nhom').eq(0).find('a').attr('href') || 'Không có Facebook.';
            
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: title, url: url })
                        .setDescription(description)
                        .setColor('#f3f3f3')
                        .setImage(imgSrc)
                        .addFields(
                            { name: 'Trưởng nhóm', value: leader, inline: true },
                            { name: 'Phó nhóm', value: deputy, inline: true },
                            { name: 'Lượt thích', value: likes, inline: true },
                            { name: 'Ngân sách', value: budget, inline: true },
                            { name: 'Top Tuần', value: topWeek, inline: true },
                            { name: 'Facebook', value: facebookLink, inline: true },
                            { name: 'Link Discord', value: discordLink, inline: true }
                        );
            
                    await interaction.followUp({ embeds: [embed] });
            
                } catch (error) {
                    console.error(`Error fetching data: ${error.message}`);
                    await interaction.followUp({ content: `Đã xảy ra lỗi khi xử lý thông tin: ${error.message}`, ephemeral: true });
                }
            }}