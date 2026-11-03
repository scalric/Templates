import type { Template } from '../../types/template'
import { cta, defineTemplate, features, footer, hero, navbar, showcase, story, testimonials } from '../builders'

const img = (file: string) => `/images/lumen-derm/${file}`

export const aestheticTemplates: Template[] = [
  defineTemplate({
    slug: 'lumen-skin-dermatology-clinic',
    name: 'Lumen Dermatology Clinic',
    tagline: 'Medical and cosmetic skin care from board-certified dermatologists',
    description:
      'A calm, clinical template for skin clinics, with condition and treatment pages, a dermatologist team and a teledermatology enquiry.',
    category: 'clinics',
    tags: ['dermatology', 'skincare', 'clinic', 'acne', 'cosmetic'],
    price: 'free',
    popularity: 83,
    createdAt: '2026-10-28',
    isNew: true,
    author: 'Templates Studio',
    highlights: ['Editorial serif hero with stamp seal', 'Treatment cards with photography', 'Dermatologist-led trust strip', 'Full-bleed clinic call to action'],
    includedPages: ['Home', 'Conditions', 'Treatments', 'Dermatologists', 'Book'],
    theme: { primary: '#a48a70', primaryText: '#ffffff', secondary: '#e8dfd5', background: '#f1ebe4', text: '#3b2c22', muted: '#8a7a6c', radius: 'sharp', headingFont: 'serif' },
    sections: [
      navbar({
        brand: 'Lumen',
        icon: 'leaf',
        subtitle: 'Dermatology Clinic',
        links: ['Home', 'Conditions', 'Treatments', 'Dermatologists', 'About', 'Contact'],
        cta: 'Book Appointment',
        layout: 'aesthetic',
      }),
      hero({
        layout: 'aesthetic',
        eyebrow: 'Advanced care · Natural results',
        title: 'Your best self,\nrefined.',
        subtitle: 'Personalized dermatology and aesthetic treatments designed to reveal your natural skin and boost your confidence.',
        primaryCta: 'Book a consultation',
        secondaryCta: 'Explore treatments',
        imageLabel: 'Woman with clear, radiant skin at Lumen Dermatology Clinic',
        imageIcon: 'leaf',
        imageUrl: img('hero-face.webp'),
        imagePosition: 'center 30%',
        sealText: 'Aesthetic approved · Natural beauty',
      }),
      showcase({
        title: 'Tailored to you',
        eyebrow: 'Signature treatments',
        variant: 'cards',
        layout: 'signature',
        buttonLabel: 'Discover',
        items: [
          { title: 'Apparatus', description: 'Precision devices that firm, tone and refresh the skin without downtime.', icon: 'zap', imageUrl: img('treatment-apparatus.webp'), textInset: '1.25rem' },
          { title: 'Injection', description: 'Targeted injectables that smooth lines and restore natural volume.', icon: 'stethoscope', imageUrl: img('treatment-injection.webp') },
          { title: 'Skin', description: 'Advanced skin treatments to rejuvenate, restore and refresh.', icon: 'leaf', imageUrl: img('treatment-skin.webp') },
          { title: 'Facial', description: 'Custom facials that deeply cleanse, hydrate and enhance your glow.', icon: 'flower', imageUrl: img('treatment-facial.webp') },
          { title: 'Body', description: 'Sculpt, tone and contour with cutting-edge technology.', icon: 'sparkles', imageUrl: img('treatment-body.webp') },
        ],
      }),
      story({
        layout: 'about',
        buttonLabel: 'Learn more',
        eyebrow: 'About the clinic',
        title: 'About the Clinic',
        description: 'Lumen is a space for aesthetics and professional care. We combine advanced technologies, an expert team and a personalized approach to your beauty at every stage.',
        images: [{ imageUrl: img('clinic-interior.webp'), label: 'The Lumen Dermatology Clinic reception', imagePosition: 'center 50%' }],
        quote: 'Beauty, refined with care.',
        highlights: ['Modern equipment', 'Exclusive methods', 'High service standards'],
        stats: [
          { icon: 'clock', value: '7+', label: 'Years in operation' },
          { icon: 'users', value: '15,000+', label: 'Satisfied clients' },
          { icon: 'award', value: '20+', label: 'Certified specialists' },
        ],
      }),
      features({ layout: 'process', title: 'A comprehensive approach to your beauty', items: [
        { icon: 'mail', title: 'Consultation', description: 'Analysis of your needs and goals' },
        { icon: 'calendar', title: 'Personalized plan', description: 'A custom treatment program' },
        { icon: 'users', title: 'Procedures', description: 'Professional treatments with care and comfort' },
        { icon: 'star', title: 'Results', description: 'A natural enhancement of your beauty' },
      ] }),
      testimonials({ title: 'Kind words, real results', layout: 'portraits', items: [
        { quote: 'The team at Lumen is incredible. My skin has never looked this healthy and radiant. The results are so natural!', name: 'Emily', role: 'Patient', imageUrl: img('testimonial-emily.webp') },
        { quote: 'A truly luxurious and professional experience. They took the time to understand my goals and created a plan that worked perfectly for me.', name: 'Sophia', role: 'Patient', imageUrl: img('testimonial-sophia.webp') },
        { quote: 'I love the natural results! The treatments have boosted my confidence so much. Highly recommend Lumen.', name: 'Olivia', role: 'Patient', imageUrl: img('testimonial-olivia.webp') },
      ] }),
      cta({
        layout: 'feature',
        title: 'Confidence\nstarts with you',
        subtitle: 'Book a consultation and receive a personalized skin care plan from our dermatologists.',
        button: 'Book your consultation',
        tone: 'primary',
        eyebrow: 'Beauty · Confidence · You',
        imageUrl: img('cta-confidence.webp'),
        imagePosition: 'center 40%',
      }),
      footer({ brand: 'Lumen Dermatology Clinic', tagline: 'Advanced care, delivered with a natural touch.', columns: [{ title: 'Treatments', links: ['Skin', 'Facial', 'Body', 'Acne care', 'Pigmentation'] }, { title: 'Clinic', links: ['About us', 'Dermatologists', 'Results', 'FAQs', 'Contact'] }, { title: 'Get in touch', links: ['27 Glow Avenue, Koramangala, Bengaluru', '+91 98555 00014', 'care@lumenderm.in'] }], newsletter: { placeholder: 'Your email address', buttonLabel: 'Subscribe' },
        copyright: '© 2026 Lumen Dermatology Clinic. All rights reserved.' }),
    ],
  }),
]
