import {
  SlashCommandBuilder,
  EmbedBuilder,
  type CommandInteraction,
} from 'discord.js';
import { COLOR } from '~/config';

export default {
  data: new SlashCommandBuilder()
    .setName('contact')
    .setDescription('Contact the developer of this bot.'),

  async execute(interaction: CommandInteraction) {
    try {
      const embed = new EmbedBuilder()
        .setColor(COLOR.PRIMARY)
        .setTitle('Contact')
        .setDescription(
          'This bot is a service using DeepL API.\nIt is not officially affiliated with the company.\n\nIf you have any questions, please contact the developer on Twitter\nhttps://twitter.com/minagishl\n\nAlso, please do not contact DeepL for problems with this service!',
        );
      await interaction.reply({ embeds: [embed] });
    } catch (err: any) {
      console.error(err);
    }
  },
};
