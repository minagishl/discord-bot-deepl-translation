import {
  SlashCommandBuilder,
  type EmbedBuilder,
  type ChatInputCommandInteraction,
  type SlashCommandSubcommandBuilder,
} from 'discord.js';
import { type DeeplLanguages } from 'deepl';
import { choices } from '../constants';
import deepl from '../utils/deepl';

function addCommonOptions(
  subcommand: SlashCommandSubcommandBuilder,
): SlashCommandSubcommandBuilder {
  return subcommand
    .addStringOption((option) =>
      option
        .setName('language')
        .setDescription('The language to translate to')
        .setRequired(false)
        .addChoices(...choices),
    )
    .addBooleanOption((option) =>
      option
        .setName('original')
        .setDescription('You can specify whether to display the original text')
        .setRequired(false),
    );
}

async function translateText(
  interaction: ChatInputCommandInteraction,
): Promise<string | { embeds: [EmbedBuilder] }> {
  const text = String(interaction.options.get('text')?.value ?? '');
  const language = String(
    interaction.options.get('language')?.value ?? 'JA',
  ).toUpperCase() as DeeplLanguages;
  const original = interaction.options.getBoolean('original') ?? false;

  return await deepl(text ?? '', language, original);
}

async function translatePrevious(
  interaction: ChatInputCommandInteraction,
): Promise<string | { embeds: [EmbedBuilder] }> {
  const text = await interaction.channel?.messages
    .fetch({ limit: 2 })
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
      addCommonOptions(
        subcommand
          .setName('text')
          .setDescription('Translate entered text')
          .addStringOption((option) =>
            option
              .setName('text')
              .setDescription('The text to be translated')
              .setMaxLength(1500)
              .setRequired(true),
          ),
      ),
    )
    .addSubcommand((subcommand) =>
      addCommonOptions(
        subcommand
          .setName('previous')
          .setDescription('Translate previous text'),
      ),
    )
    .addSubcommand((subcommand) =>
      addCommonOptions(
        subcommand
          .setName('private')
          .setDescription('A private command that only the executor can see')
          .addStringOption((option) =>
            option
              .setName('text')
              .setDescription('The text to be translated')
              .setMaxLength(1500)
              .setRequired(true),
          ),
      ),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      const isPrivate: boolean = subcommand === 'private';
      // Indicate that the bot is typing
      await interaction.deferReply({ ephemeral: isPrivate });

      let translation: string | { embeds: [EmbedBuilder] } = '';

      if (subcommand === 'text' || isPrivate) {
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
