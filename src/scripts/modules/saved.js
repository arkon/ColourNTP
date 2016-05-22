import Chrome from './chrome';

class SavedColours {
  static saved = [];

  static _fetchedFromStorage = false;

  static getColours () {
    if (SavedColours._fetchedFromStorage) {
      return SavedColours.saved;
    }

    // Better handle async
    Chrome.getSetting('saved', (results) => {
      if (results.saved) {
        SavedColours.saved = JSON.parse(results.saved);
      }

      SavedColours._fetchedFromStorage = true;

      return SavedColours.saved;
    });
  }

  /**
   * colour should be a hex value
   */
  static addColour (colour) {
    SavedColours.saved.push(colour);

    // TODO: can Chrome storage save arrays?
    Chrome.setSetting('saved', JSON.stringify(SavedColours.saved));
  }
}

export default SavedColours;
