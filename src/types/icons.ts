/** Single source of truth for icon names usable inside template data. */
export const ICON_NAMES = [
  'heart', 'shield', 'clock', 'star', 'sparkles', 'zap', 'users', 'calendar', 'leaf',
  'truck', 'lock', 'chart', 'code', 'camera', 'award', 'phone', 'stethoscope', 'building',
  'utensils', 'croissant', 'smile', 'layers', 'briefcase', 'bag', 'palette', 'flame',
  'wheat', 'globe', 'mail', 'map-pin', 'pen-tool', 'package', 'gift', 'chef-hat', 'waves',
  'trophy', 'scissors', 'music', 'house', 'plane', 'book-open', 'flower', 'plug',
  'handshake', 'dumbbell', 'calculator', 'sofa',
] as const

export type IconName = (typeof ICON_NAMES)[number]
