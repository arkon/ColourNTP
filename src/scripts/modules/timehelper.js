export default class TimeHelper {
  static pad(num) {
    if (num === undefined) {
      return '--';
    }

    return (num < 10) ? `0${num}` : num.toString();
  }
}
