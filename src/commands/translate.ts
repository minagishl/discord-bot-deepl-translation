import {
  SlashCommandBuilder,
  EmbedBuilder,
  type CommandInteraction,
} from 'discord.js';
import { COLOR } from '~/config';
import translate, { type DeeplLanguages } from 'deepl';

export default {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Translates the entered text')
    .addStringOption((option) =>
      option
        .setName('text')
        .setDescription('The text to be translated')
        .setMaxLength(1500)
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('language')
        .setDescription('The language to translate to')
        .setRequired(false)
        .addChoices(
          // Only certain languages because the quantity is too large.
          { name: 'Chinese', value: 'zh' },
          { name: 'Dutch', value: 'nl' },
          { name: 'English', value: 'en' },
          { name: 'French', value: 'fr' },
          { name: 'German', value: 'de' },
          { name: 'Italian', value: 'it' },
          { name: 'Japanese', value: 'ja' },
          { name: 'Korean', value: 'ko' },
          { name: 'Polish', value: 'pl' },
          { name: 'Portuguese', value: 'pt' },
          { name: 'Russian', value: 'ru' },
          { name: 'Spanish', value: 'es' },
        ),
    ),

  async execute(interaction: CommandInteraction) {
    // Set the DEEPL_API_KEY environment variables
    const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

    if (DEEPL_API_KEY === undefined) {
      await interaction.reply('The DEEPL_API_KEY is not set.');
      return;
    }

    try {
      const text = interaction.options.get('text')?.value ?? '';
      const language = String(
        interaction.options.get('language')?.value ?? 'JA',
      ).toUpperCase() as DeeplLanguages;

      switch (text) {
        // Check if the text to be translated is empty
        case '':
          await interaction.reply('The text to be translated is empty.');
          break;

        // Check if the text to be translated is too long
        case text.toLocaleString.length > 1500:
          await interaction.reply('The text to be translated is too long.');
          break;

        default: {
          await translate({
            free_api: true,
            text: String(text),
            target_lang: language,
            auth_key: DEEPL_API_KEY,
          })
            .then(async (result) => {
              // Check if the translation is empty
              if (result.data.translations[0].text === undefined) {
                await interaction.reply(
                  'An error occurred while translating the text.',
                );
                return;
              }

              const translatedText = result.data.translations[0].text;
              const embed = new EmbedBuilder()
                .setTitle('Translation')
                .setColor(COLOR.DEEPL_BLUE)
                .setDescription(
                  'Text after translation:\n```\n' + translatedText + '\n```',
                )
                .setFooter({
                  text: 'This application works with the DeepL API.',
                });

              await interaction.reply({ embeds: [embed] });
            })
            .catch(async (err) => {
              console.error(err);
              await interaction.reply(
                'An error occurred while translating the text.',
              );
            });
          break;
        }
      }
    } catch (err: any) {
      console.error(err);
    }
  },
};
