export const weatherOptions = [
  'Sunny ☀️',
  'Cloudy ⛅',
  'Rainy 🌧️',
  'Windy 💨',
  'Stormy ⛈️',
]

export function createDprDefaults(projectId = '') {
  return {
    projectId: projectId ? String(projectId) : '',
    date: new Date().toISOString().split('T')[0],
    weather: '',
    workDescription: '',
    workerCount: '',
  }
}
