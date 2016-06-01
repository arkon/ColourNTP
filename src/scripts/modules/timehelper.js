export class TimeHelper {
  static pad (num) {
    return (num < 10) ? `0${num}` : num.toString();
  }
}
