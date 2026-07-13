// Maps any name variant (lowercase) to a photo filename in /public/volunteers/
const photoMap: Record<string, string> = {
  // Elva
  'elva': 'Elva.jpg',

  // Ivy Tang
  'ivy': 'Ivy_Tang.jpg',
  'ivy tang': 'Ivy_Tang.jpg',

  // Jiazu
  'jiazu': 'Jiazu Zhang.jpg',
  'jiazu zhang': 'Jiazu Zhang.jpg',

  // Junxia Lin (君夏)
  '君夏': 'JunxiaLin.jpg',
  'junxia': 'JunxiaLin.jpg',
  'junxia lin': 'JunxiaLin.jpg',

  // Joseph
  'joseph': 'Liwen_Chen.jpg',

  // Roger Huang
  'roger': 'Roger_Huang.jpg',
  'roger huang': 'Roger_Huang.jpg',

  // Shiqi Cai
  'shiqi cai': 'shiqi_cai.jpg',

  // Teng
  'teng': 'teng.jpg',

  // Tiger Tang
  'tiger': 'TigerTang.png',
  'tiger tang': 'TigerTang.png',
}

export function getVolunteerPhoto(name: string): string {
  return photoMap[name.toLowerCase().trim()] ?? ''
}
