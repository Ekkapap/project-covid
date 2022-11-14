/* eslint-disable @typescript-eslint/no-unused-vars */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/th';
import en from './lang/en.json';
import th from './lang/th.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  th: {
    translation: th,
  },
};

const thaiYear = (moment: any, format: any) => {
  const christianYear = moment.format('YYYY');
  const buddhishYear = (parseInt(christianYear) + 543).toString();
  return moment
    .format(format.replace('YYYY', buddhishYear).replace('YY', buddhishYear.substring(2, 4)))
    .replace(christianYear, buddhishYear);

};
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'th',
    debug: true,
    // lng: lang,
    // ns: ['common'],
    // defaultNS: 'common',
    interpolation: {
      escapeValue: false, // react already safes from xss
      format: function (value, format, lng) {

        if (format === 'uppercase') return value.toUpperCase();
        if (value instanceof Date) {
          if (lng == "th") {
            moment.locale(["th", "th"]);
            return thaiYear(moment(value), format);
          } else {
            moment.locale(["en", "en"]);
            return moment(value).format(format);
          }
        }
        return value;
      }
    },
    react: {
      bindI18n: 'lang changed',
      bindI18nStore: 'LANG STORE',
      nsMode: 'default',
    },
  });

export default i18n;
