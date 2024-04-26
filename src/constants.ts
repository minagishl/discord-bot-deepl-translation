import { type APIApplicationCommandOptionChoice } from 'discord.js';

export const choices: Array<APIApplicationCommandOptionChoice<string>> = [
  // Only certain languages because the quantity is too large.
  { name: 'Chinese', value: 'ZH' },
  { name: 'Dutch', value: 'NL' },
  { name: 'English', value: 'EN' },
  { name: 'French', value: 'FR' },
  { name: 'German', value: 'DE' },
  { name: 'Italian', value: 'IT' },
  { name: 'Japanese', value: 'JA' },
  { name: 'Korean', value: 'KO' },
  { name: 'Polish', value: 'PL' },
  { name: 'Portuguese', value: 'PT' },
  { name: 'Russian', value: 'RU' },
  { name: 'Spanish', value: 'ES' },
];

export const userCommands: Array<{ name: string; type: number }> = [
  { name: 'Translate (AUTO)', type: 3 },
  { name: 'Translate (EN)', type: 3 },
  { name: 'Translate (JA)', type: 3 },
];
