import Chrome from './chrome';

class SavedColours {
  static saved = [];
  static _fetchedFromStorage = false;

  static get (done) {
    if (SavedColours._fetchedFromStorage) {
      done(SavedColours.saved);
    }

    // Better handle async
    Chrome.getSetting('saved', (results) => {
      if (results.saved) {
        SavedColours.saved = results.saved;
      }

      SavedColours._fetchedFromStorage = true;

      done(SavedColours.saved);
    });
  }

  /**
   * colour should be a hex value
   */
  static add (colour) {
    SavedColours.saved.push(colour);

    Chrome.setSetting('saved', SavedColours.saved);
  }
}

export default SavedColours;
