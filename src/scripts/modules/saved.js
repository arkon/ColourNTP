import Chrome from './chrome';

export default class Saved {
  static data = [];
  static _fetchedFromStorage = false;

  /**
   * Returns a promise
   */
  static get() {
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
  static add(colour) {
    if (!Saved._fetchedFromStorage) {
      Saved.get()
        .then(() => {
          Saved._add(colour);
        });
    } else {
      Saved._add(colour);
    }
  }

  // Private method
  static _add(colour) {
    if (Saved.data.indexOf(colour) === -1) {
      Saved.data.push(colour);

      Chrome.setSetting('saved', Saved.data);
    }
  }

  static remove(index) {
    Saved.data.splice(index, 1);

    Chrome.setSetting('saved', Saved.data);

    return Saved.data;
  }

  static clear() {
    Saved.data = [];

    Chrome.setSetting('saved', Saved.data);

    return Saved.data;
  }
}
