import type { Template } from '../../types/template'
import { cta, defineTemplate, features, footer, hero, navbar, showcase, story, testimonials } from '../builders'

export const rentalPropertyTemplates: Template[] = [
  defineTemplate({
    slug: 'hearth-and-key-rentals',
    name: 'Hearth & Key Rentals',
    tagline: 'Rental listings, viewings and tenant applications',
    description:
      'A friendly template for landlords and letting agents. It has a search-led hero, featured rental listings with prices, how renting works, tenant reviews and a viewing call to action.',
    category: 'property',
    tags: ['rental', 'landlord', 'letting', 'apartments', 'tenants'],
    price: 'free',
    popularity: 74,
    createdAt: '2026-11-04',
    isNew: true,
    author: 'Templates Studio',
    highlights: [
      'Search-led hero for finding a home',
      'Featured listings with rent and key details',
      'Step-by-step guide from viewing to move-in',
      'Tenant reviews and a viewing call to action',
    ],
    includedPages: ['Home', 'Listings', 'How renting works', 'Landlords', 'Contact'],
    theme: {
      primary: '#3f4f8a',
      primaryText: '#ffffff',
      secondary: '#eef0f9',
      background: '#fbfbff',
      text: '#1d2340',
      muted: '#636a86',
      radius: 'round',
      headingFont: 'sans',
    },
    sections: [
      navbar({
        brand: 'Hearth & Key',
        icon: 'house',
        subtitle: 'Rentals',
        layout: 'default',
        links: ['Home', 'Listings', 'How renting works', 'Landlords', 'Contact'],
        cta: 'Book a viewing',
        showSearch: false,
      }),
      hero({
        layout: 'split',
        eyebrow: 'Verified homes · Flexible terms',
        title: 'Find a rental that feels like home',
        subtitle:
          'Carefully checked apartments and houses with transparent rents, quick viewings and a smooth move-in process.',
        primaryCta: 'Browse listings',
        secondaryCta: 'How renting works',
        imageLabel: 'Bright living room in a rental flat',
        imageIcon: 'house',
        imagePosition: 'center 40%',
      }),
      showcase({
        eyebrow: 'Featured listings',
        title: 'Homes Available Now',
        subtitle: 'Fully checked, ready to move into and priced clearly.',
        variant: 'cards',
        layout: 'default',
        buttonLabel: 'See all listings',
        items: [
          { title: '2 BHK Apartment, Koregaon Park', description: '2 bedrooms · 2 baths · 1,050 sq ft · Furnished', price: '₹38,000 / month', tag: 'Available now', icon: 'house' },
          { title: '3 BHK Family Home, Baner', description: '3 bedrooms · 3 baths · 1,600 sq ft · Parking', price: '₹52,000 / month', tag: 'New', icon: 'house' },
          { title: '1 BHK Studio, Kalyani Nagar', description: '1 bedroom · 1 bath · 620 sq ft · Pet friendly', price: '₹22,500 / month', tag: 'Popular', icon: 'building' },
        ],
      }),
      features({
        layout: 'cards',
        eyebrow: 'How renting works',
        title: 'From first viewing to move-in',
        items: [
          { icon: 'calendar', title: '1. Book a viewing', description: 'Pick a time online or call us. Most viewings happen within two days.' },
          { icon: 'shield', title: '2. Apply and verify', description: 'A simple online application with reference and background checks.' },
          { icon: 'handshake', title: '3. Sign and move in', description: 'Digital agreement, deposit protection and keys on your move-in day.' },
        ],
      }),
      story({
        layout: 'split',
        imageSide: 'right',
        eyebrow: 'For landlords',
        title: 'Let with confidence',
        description:
          'We manage marketing, tenant screening, rent collection and maintenance, so your property earns steadily and stays in good condition.',
        images: [{ imageUrl: '', label: 'Property management team' }],
        quote: '',
        stats: [
          { icon: 'house', value: '400+', label: 'Homes managed' },
          { icon: 'clock', value: '14 days', label: 'Average time to let' },
          { icon: 'star', value: '4.8', label: 'Landlord rating' },
        ],
        buttonLabel: 'List your property',
      }),
      testimonials({
        layout: 'cards',
        eyebrow: 'Tenant reviews',
        title: 'Happy tenants, happy homes',
        items: [
          { quote: 'The viewing was booked the same day and the move-in was completely stress free.', name: 'Neha G.', role: 'Tenant, Koregaon Park' },
          { quote: 'Transparent rent, no hidden fees and a quick response to every maintenance request.', name: 'Rohan P.', role: 'Tenant, Baner' },
          { quote: 'The team helped me find a pet-friendly flat within a week. Highly recommended.', name: 'Meera S.', role: 'Tenant, Kalyani Nagar' },
        ],
      }),
      cta({
        layout: 'banner',
        title: 'Your next home is one viewing away',
        subtitle: 'Book a visit to any listing, or tell us what you are looking for.',
        button: 'Book a viewing',
        tone: 'primary',
      }),
      footer({
        variant: 'default',
        brand: 'Hearth & Key Rentals',
        brandIcon: 'house',
        tagline: 'Verified rentals and friendly letting, made simple.',
        newsletter: { placeholder: 'Your email address', buttonLabel: 'Get new listings' },
        socialLinks: [
          { platform: 'instagram', label: 'Instagram' },
          { platform: 'facebook', label: 'Facebook' },
        ],
        columns: [
          { title: 'Rentals', links: ['Browse listings', 'How renting works', 'Tenant FAQs', 'Deposit protection'] },
          { title: 'Landlords', links: ['List your property', 'Management services', 'Landlord login'] },
          {
            title: 'Contact',
            links: [],
            details: [
              { icon: 'map-pin', text: '17 Lake View Road, Pune' },
              { icon: 'phone', text: '+91 98700 00030' },
              { icon: 'mail', text: 'lets@hearthandkey.in' },
            ],
          },
        ],
        copyright: '© 2026 Hearth & Key Rentals. All rights reserved.',
      }),
    ],
  }),
]
