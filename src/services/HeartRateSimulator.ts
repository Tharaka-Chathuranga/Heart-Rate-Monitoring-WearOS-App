export class HeartRateSimulator {
  private interval: NodeJS.Timer | null = null;
  private baseRate: number = 70;
  private variance: number = 5;

  startSimulation(onHeartRate: (rate: number) => void): void {
    this.interval = setInterval(() => {
      // Generate realistic heart rate values
      const randomVariance = Math.random() * this.variance * 2 - this.variance;
      const simulatedRate = Math.round(this.baseRate + randomVariance);
      onHeartRate(simulatedRate);
    }, 1000); // Update every second
  }

  stopSimulation(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // Simulate different activities
  setActivity(activity: 'rest' | 'walking' | 'running'): void {
    switch (activity) {
      case 'rest':
        this.baseRate = 70;
        this.variance = 5;
        break;
      case 'walking':
        this.baseRate = 100;
        this.variance = 10;
        break;
      case 'running':
        this.baseRate = 150;
        this.variance = 15;
        break;
    }
  }
}