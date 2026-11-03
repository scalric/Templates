import type { Template } from '../../types/template'
import { cta, defineTemplate, footer, hero, navbar, showcase, story, testimonials } from '../builders'

const img = (file: string) => `/images/carewell/${file}`

export const pharmacyTemplates: Template[] = [
  defineTemplate({
    slug: 'carewell-pharmacy',
    name: 'Carewell Pharmacy',
    tagline: 'Trusted medicines and healthy choices',
    description:
      'A clean, clinical template for pharmacies and pharmaceutical brands. A search-led hero, a product catalogue, wellness and about sections, and customer reviews in a calm blue palette.',
    category: 'hospital',
    tags: ['pharmacy', 'medicines', 'prescriptions', 'health', 'wellness'],
    price: 'free',
    popularity: 78,
    createdAt: '2026-11-03',
    isNew: true,
    author: 'Templates Studio',
    highlights: ['Medicine search in the hero', 'Product category cards', 'Wellness and about sections', 'Customer reviews and dark footer'],
    includedPages: ['Home', 'About Us', 'Products', 'Our Focus', 'Careers'],
    theme: { primary: '#1f6fbf', primaryText: '#ffffff', secondary: '#eaf3fb', background: '#ffffff', text: '#0c2340', muted: '#5a6b7d', radius: 'soft', headingFont: 'sans' },
    sections: [
      navbar({ brand: 'Carewell', icon: 'leaf', subtitle: 'Health for a better tomorrow', links: ['Home', 'About Us', 'Products', 'Our Focus', 'Careers', 'Contact'], cta: 'Get in Touch', layout: 'nexora' }),
      hero({
        layout: 'nexora',
        title: 'Better Health\nBrighter Future',
        highlight: 'Future',
        subtitle: 'Trusted pharmaceutical solutions for a healthier tomorrow.',
        primaryCta: 'Find Now',
        imageLabel: 'A pharmacist examining a sample under a microscope',
        imageIcon: 'waves',
        imageUrl: img('hero-lab.webp'),
        imagePosition: 'center 40%',
        benefits: [
          { icon: 'shield', title: 'Trusted Quality', description: 'International standards' },
          { icon: 'sparkles', title: 'Innovative Research', description: '& development' },
          { icon: 'users', title: 'Patient Care', description: 'Focused' },
        ],
        searchFields: [
          { label: 'Search Medicine', placeholder: 'Search by medicine name' },
          { label: 'Category', placeholder: 'All Categories' },
          { label: 'Find Nearby', placeholder: 'Enter location' },
        ],
      }),
      showcase({
        layout: 'catalog',
        eyebrow: 'Our products',
        title: 'A wide range of pharmaceutical solutions',
        subtitle: 'From everyday health needs to specialised therapies, we offer a comprehensive range of products designed for a healthier tomorrow.',
        variant: 'cards',
        buttonLabel: 'View all products',
        items: [
          { title: 'Tablets & Capsules', icon: 'package', imageUrl: img('product-tablets.webp'), aspect: '1 / 1' },
          { title: 'Syrups & Suspensions', icon: 'waves', imageUrl: img('product-syrup.webp'), aspect: '1 / 1' },
          { title: 'Injectables', icon: 'stethoscope', imageUrl: img('product-injectables.webp'), aspect: '1 / 1' },
          { title: 'Ointments & Creams', icon: 'heart', imageUrl: img('product-ointment.webp'), aspect: '1 / 1' },
        ],
      }),
      showcase({
        layout: 'category-grid',
        title: 'Our product categories',
        variant: 'cards',
        items: [
          { title: 'Cardiovascular', icon: 'heart', description: 'Medicines for heart health and blood pressure management.' },
          { title: 'Respiratory', icon: 'waves', description: 'Effective solutions for asthma, cough, cold and other respiratory care.' },
          { title: 'Gastrointestinal', icon: 'utensils', description: 'Range of products for acidity, ulcers and other GI disorders.' },
          { title: 'Pain Management', icon: 'zap', description: 'Trusted relief from pain, inflammation and musculoskeletal issues.' },
          { title: 'Anti-Infectives', icon: 'shield', description: 'Antibiotics and anti-viral medicines for various infections.' },
        ],
      }),
      story({
        layout: 'wellness',
        eyebrow: 'Health & wellness',
        title: 'Healthy choices\nfor a brighter tomorrow',
        description: 'Because good health is the foundation for a better life, we bring you trusted medicines and wellness solutions.',
        buttonLabel: 'Our mission',
        images: [{ imageUrl: img('wellness-family.webp'), label: 'A smiling family enjoying a sunny day outdoors', imagePosition: 'center 35%' }],
        quote: 'Healthier families, stronger communities.',
        stats: [
          { icon: 'stethoscope', value: '20+', label: 'Years of excellence' },
          { icon: 'users', value: '100+', label: 'Skilled professionals' },
          { icon: 'shield', value: 'Global', label: 'Quality certifications' },
        ],
      }),
      testimonials({
        layout: 'portraits',
        eyebrow: 'What our customers say',
        title: 'Real people. Real health journeys.',
        items: [
          { quote: 'Carewell\'s medicines have made a real difference in my family\'s health. I trust them completely.', name: 'Priya S.', role: 'Customer', imageUrl: img('testimonial-priya.webp') },
          { quote: 'Reliable, safe and effective. Carewell is a brand you can always count on.', name: 'Rohan M.', role: 'Customer', imageUrl: img('testimonial-rohan.webp') },
          { quote: 'Excellent products and truly customer-focused service. Highly recommended!', name: 'Anjali P.', role: 'Customer', imageUrl: img('testimonial-anjali.webp') },
        ],
      }),
      showcase({
        layout: 'news',
        title: 'Latest news & updates',
        variant: 'cards',
        items: [
          { title: 'Carewell expands manufacturing capabilities', tag: 'May 15, 2026', imageUrl: '/images/carewell/lab-team.webp', imagePosition: 'center' },
          { title: 'New research milestone in diabetes care', tag: 'April 28, 2026', imageUrl: '/images/carewell/hero-lab.webp', imagePosition: 'center 40%' },
          { title: 'Our commitment to a sustainable future', tag: 'April 10, 2026', imageUrl: '/images/carewell/heart-hands.webp', imagePosition: 'center' },
        ],
      }),
      cta({
        layout: 'partner',
        title: 'Partner with us for\na healthier tomorrow.',
        subtitle: 'We welcome collaborations and partnerships to create a better future together.',
        button: 'Contact Us',
        tone: 'primary',
      }),
      footer({
        variant: 'dark',
        brand: 'Carewell',
        brandIcon: 'leaf',
        tagline: 'Health for a better tomorrow.',
        socialLinks: [
          { platform: 'linkedin', label: 'LinkedIn' },
          { platform: 'facebook', label: 'Facebook' },
          { platform: 'youtube', label: 'YouTube' },
          { platform: 'pinterest', label: 'Pinterest' },
        ],
        columns: [
          { title: 'Quick Links', links: ['Home', 'About Us', 'Products', 'Our Focus', 'Careers', 'Contact'] },
          { title: 'More Information', links: ['Quality & Safety', 'Manufacturing', 'Careers', 'FAQs'] },
        ],
        newsletter: { placeholder: 'Enter your email address', buttonLabel: 'Subscribe' },
        copyright: '© 2026 Carewell Pharmacy. All rights reserved.',
        legalLinks: ['Privacy Policy', 'Terms & Conditions'],
      }),
    ],
  }),
]
