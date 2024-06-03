export function convertWindSpeed(speedInMeterPerSecond: number): string {
  return `${(speedInMeterPerSecond * 3.6).toFixed(0)} km/h`;
}
