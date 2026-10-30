import {
  Award, BarChart3, Briefcase, Building2, Camera, Clock, Code2, Croissant, Flame, Globe, Heart,
  Layers, Leaf, Lock, Mail, MapPin, Package, Palette, PenTool, Phone, ShieldCheck, ShoppingBag,
  Smile, Sparkles, Star, Stethoscope, Gift, ChefHat, Waves, Trophy, Scissors, Music, House, Plane, BookOpen, Flower, Plug, Handshake, Dumbbell, Calculator, Sofa, Truck, UtensilsCrossed, Users, Wheat, Zap, CalendarCheck,
  type LucideIcon,
} from 'lucide-react'
import type { IconName } from '../../types/icons'

/** Maps data-level icon names to lucide components. Must cover every IconName. */
const ICONS: Record<IconName, LucideIcon> = {
  heart: Heart,
  shield: ShieldCheck,
  clock: Clock,
  star: Star,
  sparkles: Sparkles,
  zap: Zap,
  users: Users,
  calendar: CalendarCheck,
  leaf: Leaf,
  truck: Truck,
  lock: Lock,
  chart: BarChart3,
  code: Code2,
  camera: Camera,
  award: Award,
  phone: Phone,
  stethoscope: Stethoscope,
  building: Building2,
  utensils: UtensilsCrossed,
  croissant: Croissant,
  smile: Smile,
  layers: Layers,
  briefcase: Briefcase,
  bag: ShoppingBag,
  palette: Palette,
  flame: Flame,
  wheat: Wheat,
  globe: Globe,
  mail: Mail,
  'map-pin': MapPin,
  'pen-tool': PenTool,
  package: Package,
  gift: Gift,
  'chef-hat': ChefHat,
  waves: Waves,
  trophy: Trophy,
  scissors: Scissors,
  music: Music,
  house: House,
  plane: Plane,
  'book-open': BookOpen,
  flower: Flower,
  plug: Plug,
  handshake: Handshake,
  dumbbell: Dumbbell,
  calculator: Calculator,
  sofa: Sofa,
}

interface IconProps {
  name: IconName
  className?: string
  size?: number
  strokeWidth?: number
}

export function Icon({ name, className, size = 20, strokeWidth = 1.75 }: IconProps) {
  const Cmp = ICONS[name]
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" />
}
