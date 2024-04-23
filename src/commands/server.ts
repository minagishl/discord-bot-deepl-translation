import {
  SlashCommandBuilder,
  EmbedBuilder,
  type ChatInputCommandInteraction,
} from 'discord.js';
import { COLOR } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Get the current server language'),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const languageCode = interaction.guild?.preferredLocale as string;
      const languageName = new Intl.DisplayNames(['en'], {
        type: 'language',
      });
      const embed = new EmbedBuilder()
        .setColor(COLOR.PRIMARY)
        .setTitle('Server Language')
        .setDescription(
          `The language of this server is ${languageName.of(languageCode)}.`,
        );
      await interaction.reply({ embeds: [embed] });
    } catch (err: any) {
      console.error(err);
    }
  },
};
