const { EmbedBuilder, CommandInteraction } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports.data = {
    name: "checktruyen",
    description: "Sẽ đăng truyện mới nhất của team (Big Cat)",
    type: 1, // slash command
    options: [],
    integration_types: [0, 1],
    contexts: [0, 1, 2],
};

/**
 * 
 * @param { CommandInteraction } interaction 
 */
module.exports.execute = async (interaction) => {
    const roleID = "868329213877420053"; //(Role thiên hoàng)
    try {
        const COMIC_URL = 'https://hentaihvn.tv/g/BigCat';
        const COMIC_URL_2 = 'https://hentaihvn.tv/forum/search-plus.php';
        
        function extractLatestComic(html) {
            const $ = cheerio.load(html);
            const latestComic = $('.block-item .item').first();

            const title = latestComic.find('.box-description p a').first().text().trim() || 'No title available';
            const url = latestComic.find('.box-cover a').attr('href');
            const fullUrl = `https://hentaihvn.tv${url}`;
            const categories = latestComic.find('.box-description .tag')
                .map((i, el) => $(el).text())
                .get()
                .join(', ') || 'Không có thể loại';

            const imgSrc = latestComic.find('.box-cover img').attr('data-src') || null;
            const tennhom = $('.ul-list-info h2').text() || 'Không tìm thấy tên nhóm';

            const doujinshiBoNao = $('box-box textbox').attr('b')|| 'Truyện không thuộc Doujin';

            return { title, url: fullUrl, categories, imgSrc, doujinshiBoNao, tennhom };
        }

        const [response1] = await Promise.all([
            axios.get(COMIC_URL),
            axios.get(COMIC_URL_2)
        ]);

        const latestComic = extractLatestComic(response1.data);

        if (!latestComic.url || !latestComic.title) {
            await interaction.reply('Không tìm thấy truyện mới nhất.');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Truyện mới nhất: ${latestComic.title}`)
            .setDescription(`Xem ở đây nè! [Link](${latestComic.url})`)
            .addFields(
                { name: 'Thể loại', value: latestComic.categories, inline: true },
                { name: 'Tác giả', value: 'Không có tác giả', inline: true }, // You can extract author if needed
                { name: 'Nhóm', value: latestComic.tennhom, inline: true },
                { name: 'Doujinshi', value: latestComic.doujinshiBoNao, inline: true }
            );

        if (latestComic.imgSrc && latestComic.imgSrc.startsWith('http')) {
            embed.setImage(latestComic.imgSrc);
        }

        embed.setFooter({ text: 'Ngày đăng', iconURL: 'https://youriconurl.com/icon.png' }).setTimestamp();

        // Send the embed
        await interaction.reply({ embeds: [embed] });

        // Mention the role in a follow-up message
        await interaction.followUp(`<@&${roleID}>`);

    } catch (error) {
        console.error('Error fetching comics:', error);
        // Only reply once in case of an error
        if (!interaction.replied) {
            await interaction.reply('Lỗi khi lấy truyện mới nhất.');
        }
    }
};