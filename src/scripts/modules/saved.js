import Browser from './browser';

export default class Saved {
  /**
   * Returns a promise
   */
  static get() {
    return new Promise((resolve) => {
      if (Saved._fetchedFromStorage) {
        resolve(Saved.data);
      }

      Browser.getSetting('saved')
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

      Browser.setSetting('saved', Saved.data);
    }
  }

  static remove(index) {
    Saved.data.splice(index, 1);

    Browser.setSetting('saved', Saved.data);

    return Saved.data;
  }

  static clear() {
    Saved.data = [];

    Browser.setSetting('saved', Saved.data);

    return Saved.data;
  }
}

// Static properties
Saved.data = [];
Saved._fetchedFromStorage = false;
