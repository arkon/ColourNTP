import { Chrome } from './chrome';

export class Saved {
  static data = [];
  static _fetchedFromStorage = false;

  /**
   * Returns a promise
   */
  static get () {
    return new Promise((resolve, reject) => {
      if (Saved._fetchedFromStorage) {
        resolve(Saved.data);
      }

      Chrome.getSetting('saved')
        .then((results) => {
          if (results.saved) {
            Saved.data = results.saved;
          }

          Saved._fetchedFromStorage = true;

          resolve(Saved.data);
        });
    });
  }

  /**
   * colour should be a hex value
   */
  static add (colour) {
    if (!Saved._fetchedFromStorage) {
      Saved.get()
        .then(() => {
          Saved._add(colour);
        });
    } else {
      Saved._add(colour);
    }
  }

  static _add (colour) {
    Saved.data.push(colour);

    Chrome.setSetting('saved', Saved.data);
  }
}
