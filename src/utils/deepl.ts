import { EmbedBuilder } from 'discord.js';
import { COLOR } from '../config';
import translate, { type DeeplLanguages } from 'deepl';

export default async function deepl(
  text: string,
  language: DeeplLanguages,
): Promise<string | { embeds: [EmbedBuilder] }> {
  // Set the DEEPL_API_KEY environment variables
  const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

  if (DEEPL_API_KEY === undefined) {
    return 'The DEEPL_API_KEY is not set.';
  }

  // Check if the text to be translated is empty
  if (text === '') {
    return 'The text to be translated is empty.';
  }

  // Check if the text to be translated is too long
  if (text.length > 1500) {
    return 'The text to be translated is too long.';
  }

  // If the text is not empty and not too long, proceed with translation
  const result = await translate({
    free_api: true,
    text: String(text),
    target_lang: language,
    auth_key: DEEPL_API_KEY,
  });
  // Check if the translation is empty
  if (result.data.translations[0].text === '') {
    return 'An error occurred while translating the text.';
  }

  if (result.status !== 200) {
    console.error('Status:', result.status);
    return 'An error has occurred with the API, please contact your administrator';
  }

  const translatedText = result.data.translations[0].text;
  const embed = new EmbedBuilder()
    .setTitle('Translation')
    .setColor(COLOR.DEEPL_BLUE)
    .setDescription('Text after translation:\n```\n' + translatedText + '\n```')
    .setFooter({
      text: 'This application works with the DeepL API.',
    });

  return { embeds: [embed] };
}
