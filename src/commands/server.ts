import {
  SlashCommandBuilder,
  EmbedBuilder,
  type ChatInputCommandInteraction,
} from 'discord.js';
import { COLOR } from '~/config';

export default {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Returns the server information.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('get-language')
        .setDescription('Get the language of the server'),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('set-language')
        .setDescription('Set the language of the server'),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const subcommand = interaction.options.getSubcommand();

      if (subcommand === 'get-language') {
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
      } else if (subcommand === 'set-language') {
        const embed = new EmbedBuilder()
          .setColor(COLOR.PRIMARY)
          .setTitle('Server Language')
          .setDescription(
            'The language of this server has been set to English.',
          );
        await interaction.reply({ embeds: [embed] });
      }
    } catch (err: any) {
      console.error(err);
    }
  },
};
