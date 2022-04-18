const { SlashCommandBuilder } = require('@discordjs/builders');
const Levels = require("discord-xp");
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-level')
		.setDescription('Добавление уровней для пользователя')
        .addUserOption(option => option.setName('user').setDescription('Выбери пользователя').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Кол-во уровней').setRequired(true)),
	run: async ({client, interaction, args}) => {
        if (interaction.member.permissions.has("ADMINISTRATOR", true)){
            const xpam = interaction.options.getInteger('amount');
            const target = interaction.options.getUser('user');
            const user = (target.id);

            Levels.appendLevel(user, interaction.guild.id, xpam)

            interaction.reply({content: `Добавлено ${xpam} уровень(-вней) для ${target.tag}`})
            const channel = client.channels.cache.get('962312113525755904');
            const admin = interaction.user
            const addlvl = new MessageEmbed().setTitle(`**${admin.tag}** добавил ${xpam} уровень(-вней) для ${target.tag}`).setColor('#32CD32')
            channel.send({ embeds: [addlvl] });
        } else {
            interaction.reply({content: "Недостаточно прав", ephemeral: true})
        };
	},
};