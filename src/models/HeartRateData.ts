export class HeartRateData {
  constructor(heartRate, timestamp) {
    this.heartRate = heartRate;
    this.timestamp = timestamp;
  }

  static create(heartRate) {
    return new HeartRateData(heartRate, Date.now());
  }
}