import {
  SlashCommandBuilder,
  EmbedBuilder,
  type ChatInputCommandInteraction,
} from 'discord.js';
import { COLOR } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription(
      'Returns the number of servers currently joined by the Bot.',
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const embed = new EmbedBuilder()
        .setColor(COLOR.PRIMARY)
        .setTitle('Join')
        .setDescription(
          `The bot is currently joined to ${interaction.client.guilds.cache.size} servers.`,
        );
      await interaction.reply({ embeds: [embed] });
    } catch (err: any) {
      console.error(err);
    }
  },
};
