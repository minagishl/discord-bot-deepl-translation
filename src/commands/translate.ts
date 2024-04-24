import {
  SlashCommandBuilder,
  type EmbedBuilder,
  type ChatInputCommandInteraction,
} from 'discord.js';
import { type DeeplLanguages } from 'deepl';
import deepl from '../utils/deepl';

async function translateText(interaction: ChatInputCommandInteraction): Promise<
  | string
  | {
      embeds: [EmbedBuilder];
    }
> {
  const text = String(interaction.options.get('text')?.value ?? '');
  const language = String(
    interaction.options.get('language')?.value ?? 'JA',
  ).toUpperCase() as DeeplLanguages;
  const original = interaction.options.getBoolean('original') ?? false;

  return await deepl(text ?? '', language, original);
}

async function translatePrevious(
  interaction: ChatInputCommandInteraction,
): Promise<
  | string
  | {
      embeds: [EmbedBuilder];
    }
> {
  const text = await interaction.channel?.messages
    .fetch({ limit: 1 })
    .then((messages) => {
      return messages.last()?.content;
    });
  const language = String(
    interaction.options.get('language')?.value ?? 'JA',
  ).toUpperCase() as DeeplLanguages;
  const original = interaction.options.getBoolean('original') ?? false;

  return await deepl(text ?? '', language, original);
}

export default {
  data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Translates the entered text or the previous text')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('text')
        .setDescription('Translate entered text')
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
        )
        .addBooleanOption((option) =>
          option
            .setName('original')
            .setDescription(
              'You can specify whether to display the original text',
            )
            .setRequired(false),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('previous')
        .setDescription('Translate previous text')
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
        )
        .addBooleanOption((option) =>
          option
            .setName('original')
            .setDescription(
              'You can specify whether to display the original text',
            )
            .setRequired(false),
        ),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      // Indicate that the bot is typing
      await interaction.deferReply();

      const subcommand = interaction.options.getSubcommand();
      let translation:
        | string
        | {
            embeds: [EmbedBuilder];
          } = '';

      if (subcommand === 'text') {
        translation = await translateText(interaction);
      } else if (subcommand === 'previous') {
        translation = await translatePrevious(interaction);
      }

      await interaction.editReply(translation);
    } catch (err: any) {
      console.error(err);
    }
  },
};
