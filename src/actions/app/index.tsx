import { action } from '../filter';
import { LANGUAGE_CHANGE } from '../global';

export const languageChanged = {
  set: (lang: string) => action(LANGUAGE_CHANGE, { lang }),
};
