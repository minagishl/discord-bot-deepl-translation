import {
  SlashCommandBuilder,
  EmbedBuilder,
  type ChatInputCommandInteraction,
} from 'discord.js';
import { COLOR } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Check if the bot is working correctly.'),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const embed = new EmbedBuilder()
        .setColor(COLOR.PRIMARY)
        .setTitle('Status')
        .setDescription(`If you got this reply, it's working correctly!`);
      await interaction.reply({ embeds: [embed] });
    } catch (err: any) {
      console.error(err);
    }
  },
};
