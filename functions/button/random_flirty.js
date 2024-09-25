const { useMainPlayer, useQueue } = require("discord-player");
const { ButtonInteraction } = require("discord.js");
const player = useMainPlayer();
module.exports.data = {
    name: "random_flirty",
    type: "button",
}
/**
 * 
 * @param { ButtonInteraction } interaction 
 * @returns 
 */
module.exports.execute = async (interaction, lang) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'random_flirty') {
            const messages = [
                "Hoa chỉ nở khi có người tưới nước. Anh chỉ cười khi đứng trước em.",
                "Ngoài trời đang đổ cơn mưa. Vậy, em đã đổ anh chưa?",
                "Cho anh một cốc trà đào, tiện cho anh hỏi lối vào tim em!",
                "Cafe không đường rất đắng, nhưng, nó sẽ ngọt ngào khi uống cùng em!",
                "Em có thể cười một chút không? Ly cafe của anh quên cho đường rồi.",
                "Em ơi gió lạnh gần kề. Em mau thu xếp để về bên anh!",
                "Con cóc là cậu ông trời. Còn em là cả cuộc đời của anh!",
                "Họ thích nghe nhạc có lời, nhưng anh lại thích trọn đời có em!",
                "Sài Gòn đẹp nhất về đêm. Đời anh đẹp nhất khi thêm em vào!",
                "Hôm nay anh học toán hình. Tròn, vuông chẳng có mà toàn hình bóng em!",
                "Không mơ cổ tích hoang đường, chỉ mơ giấc mộng ngày ngày có em!",
                "Nếu em là protêin histon thì anh sẽ nguyện là ADN để quấn chặt lấy em.",
                "Trái tim em giờ đã hoá đá. Cần một người đập đá cứu em ra!",
                "Giới hạn của hàm số là lim, còn giới hạn của trái tim là em đấy.",
                "Hảo hảo làm em cay. Còn anh làm em say!",
                "Nhìn em anh thấy lờ mờ. Tưởng rằng say rượu ai ngờ say em.",
                "Tan thì bằng đối chia kề, anh thì tan chảy khi kề bên em.",
                "Anh thà là tiệm cận và em là đường biến thiên để ta luôn đi cùng với nhau, còn hơn là điểm tương giao, chạm nhau một lần rồi mất nhau mãi mãi!",
                "Trái tim anh như đenta bằng 0, không có em thì anh không có nghiệm.",
                "Tình cảm anh dành cho em được tính bằng hàm y=x. Luôn đồng biến và tiến đến vô cùng.",
                "Em có thích ÔM không? Nếu có thì anh nguyện là điện trở đời em.",
                "Trong Vật Lý có quy tắc nắm bàn tay phải, còn anh thì có quy tắc nắm bàn tay em.",
                "Theo định luật III Newton về lực và phản lực, thích em thì em cũng phải thích lại anh đúng không?",
                "Gọi anh là Ngô Quyền bởi vì anh đã đặt cọc trái tim ở em vào năm 938.",
                "Gọi em là Sài Gòn năm 1975 vì nụ cười em đẹp như ngày giải phóng.",
                "Em là bazơ. Anh là phenolphtalein. Hai chúng ta sẽ cùng nhau biến tình yêu thành màu hồng.",
                "Trăm năm hút cỏ hút cần. Không bằng một phút được gần bên em."
            ];
        
            const newRandomMessage = messages[Math.floor(Math.random() * messages.length)];

            // Update the interaction with the new message
            await interaction.update({ content: newRandomMessage });
        }
    }

    // Handle slash command interactions (if needed)
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Có lỗi xảy ra khi thực hiện lệnh.', ephemeral: true });
            }
        }
    }
};
