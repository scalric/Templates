import type { Category } from '../types/template'

export const categories: Category[] = [
  { id: 'dental', label: 'Dental Clinics', description: 'Calm, trustworthy sites for dentists and orthodontists.', icon: 'smile', tint: 'bg-sky-50 text-sky-600' },
  { id: 'hospital', label: 'Hospitals', description: 'Multi-department healthcare sites with clear navigation.', icon: 'stethoscope', tint: 'bg-blue-50 text-blue-600' },
  { id: 'restaurant', label: 'Restaurants', description: 'Menus, reservations and atmosphere for dining rooms.', icon: 'utensils', tint: 'bg-amber-50 text-amber-600' },
  { id: 'bakery', label: 'Bakeries', description: 'Warm, appetising sites for bakeries and cafés.', icon: 'croissant', tint: 'bg-orange-50 text-orange-600' },
  { id: 'saas', label: 'SaaS & Startups', description: 'Conversion-focused landing pages for software products.', icon: 'layers', tint: 'bg-violet-50 text-violet-600' },
  { id: 'portfolio', label: 'Portfolios', description: 'Showcase work as a designer, developer or photographer.', icon: 'briefcase', tint: 'bg-rose-50 text-rose-600' },
  { id: 'ecommerce', label: 'E-commerce', description: 'Storefronts with product grids and promotions.', icon: 'bag', tint: 'bg-emerald-50 text-emerald-600' },
  { id: 'yoga', label: 'Yoga & Wellness', description: 'Calm, welcoming sites for yoga studios and wellness spaces.', icon: 'leaf', tint: 'bg-lime-50 text-lime-700' },
  { id: 'sports', label: 'Sports & Swimming', description: 'Energetic, trustworthy sites for swimming academies and sports clubs.', icon: 'award', tint: 'bg-cyan-50 text-cyan-700' },
  { id: 'creative', label: 'Creatives & Music', description: 'Portfolios and studio sites for photographers, artists, musicians and dancers.', icon: 'palette', tint: 'bg-fuchsia-50 text-fuchsia-600' },
  { id: 'fitness', label: 'Fitness & Sports Clubs', description: 'Gyms, clubs and academies that sell memberships and classes.', icon: 'dumbbell', tint: 'bg-orange-50 text-orange-700' },
  { id: 'beauty', label: 'Beauty & Cosmetics', description: 'Salons, spas and beauty brands with bookings and product grids.', icon: 'scissors', tint: 'bg-pink-50 text-pink-600' },
  { id: 'clinics', label: 'Therapy & Clinics', description: 'Trusted sites for therapists and specialist treatment clinics.', icon: 'heart', tint: 'bg-teal-50 text-teal-700' },
  { id: 'professional', label: 'Professional Services', description: 'Firms and tradespeople who need credibility and enquiries.', icon: 'briefcase', tint: 'bg-slate-100 text-slate-700' },
  { id: 'property', label: 'Property & Stays', description: 'Real estate agents and short-stay hosts with listings and bookings.', icon: 'house', tint: 'bg-indigo-50 text-indigo-600' },
  { id: 'events', label: 'Events & Weddings', description: 'Planners and studios for weddings, parties and corporate events.', icon: 'sparkles', tint: 'bg-rose-50 text-rose-500' },
  { id: 'education', label: 'Education & Coaching', description: 'Institutes and coaches with courses, batches and enrolment.', icon: 'book-open', tint: 'bg-sky-50 text-sky-700' },
  { id: 'nonprofit', label: 'Non-profits', description: 'Charities and NGOs that need donations, stories and volunteers.', icon: 'handshake', tint: 'bg-green-50 text-green-700' },
  { id: 'travel', label: 'Travel', description: 'Travel agencies and tour operators with packages and enquiries.', icon: 'plane', tint: 'bg-cyan-50 text-cyan-700' },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  Category['id'],
  Category
>
