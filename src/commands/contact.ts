import {
  SlashCommandBuilder,
  EmbedBuilder,
  type ChatInputCommandInteraction,
} from 'discord.js';
import { COLOR } from '~/config';

export default {
  data: new SlashCommandBuilder()
    .setName('contact')
    .setDescription('Contact the developer of this bot.'),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const embed = new EmbedBuilder()
        .setColor(COLOR.PRIMARY)
        .setTitle('Contact')
        .setDescription(
          'This bot is a service using DeepL API\nIt has nothing to do with the official\n\nPlease contact the developer on Twitter if you have any questions.\nhttps://twitter.com/minagishl\n\nAlso, please do not contact DeepL for problems with this service!',
        );
      await interaction.reply({ embeds: [embed] });
    } catch (err: any) {
      console.error(err);
    }
  },
};
