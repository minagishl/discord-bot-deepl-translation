import { type APIApplicationCommandOptionChoice } from 'discord.js';

export const choices: Array<APIApplicationCommandOptionChoice<string>> = [
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
];

export const userCommands: Array<{ name: string; type: number }> = [
  { name: 'Translate (AUTO)', type: 3 },
  { name: 'Translate (EN)', type: 3 },
  { name: 'Translate (JA)', type: 3 },
];
