import type { Template } from '../../types/template'
import { cta, defineTemplate, footer, hero, navbar, showcase } from '../builders'

const img = (file: string) => `/images/luna-atelier/${file}`

export const lunaAtelier: Template = defineTemplate({
  slug: 'luna-atelier',
  name: 'Luna Atelier',
  tagline: 'Elegant fashion & lifestyle store',
  description:
    'A refined fashion storefront for clothing and accessories. Full-bleed lookbook hero, a new-arrivals grid with category tabs, an editorial mosaic and a spring collection.',
  category: 'ecommerce',
  tags: ['fashion', 'clothing', 'store', 'lookbook'],
  price: 'premium',
  popularity: 91,
  createdAt: '2026-09-10',
  isFeatured: true,
  author: 'Templates Studio',
  highlights: ['Full-bleed lookbook hero', 'New arrivals grid with category tabs', 'Editorial mosaic and spring collection', 'Newsletter-ready footer'],
  includedPages: ['Home', 'Shop', 'Product', 'Cart', 'About'],
  theme: {
    primary: '#1c1917',
    primaryText: '#ffffff',
    secondary: '#efe7e1',
    background: '#ffffff',
    text: '#1c1917',
    muted: '#78716c',
    radius: 'sharp',
    headingFont: 'sans',
  },
  sections: [
    navbar({
      brand: 'Luna Atelier',
      icon: 'bag',
      layout: 'boutique',
      links: ['Women', 'New In', 'Shop', 'About', 'Contact'],
      cta: 'Bag (0)',
      showSearch: true,
    }),
    hero({
      layout: 'boutique',
      eyebrow: 'New collection',
      title: 'Style.\nConfidence.\nYou.',
      subtitle: 'Clothing for modern women who choose quality, freedom and character.',
      primaryCta: 'Shop the Collection',
      imageLabel: 'Autumn winter lookbook',
      imageIcon: 'bag',
      imageUrl: img('hero.webp'),
      imagePosition: 'center 35%',
    }),
    showcase({
      title: 'New Arrivals',
      variant: 'products',
      layout: 'arrivals',
      tabs: ['Dresses', 'Knitwear', 'Shirts', 'Jeans', 'Accessories'],
      items: [
        { title: 'Midi Dress with Slit', price: '₹10,900', tag: 'New', imageUrl: img('arrival-midi-dress.webp'), imagePosition: 'center 15%', icon: 'sparkles' },
        { title: 'Wool Blend Sweater', price: '₹8,900', tag: 'New', imageUrl: img('arrival-sweater.webp'), imagePosition: 'center 15%', icon: 'heart' },
        { title: 'Oversized Shirt', price: '₹6,900', tag: 'New', imageUrl: img('arrival-shirt.webp'), imagePosition: 'center 15%', icon: 'award' },
        { title: 'Straight Leg Jeans', price: '₹7,900', tag: 'New', imageUrl: img('arrival-jeans.webp'), imagePosition: 'center 15%', icon: 'star' },
        { title: 'Belted Trench Coat', price: '₹14,900', tag: 'New', imageUrl: img('arrival-trench.webp'), imagePosition: 'center 15%', icon: 'shield' },
        { title: 'Leather Tote Bag', price: '₹7,900', tag: 'New', imageUrl: img('arrival-tote.webp'), imagePosition: 'center 15%', icon: 'bag' },
      ],
    }),
    showcase({
      title: '',
      variant: 'cards',
      layout: 'mosaic',
      items: [
        { title: 'Luxury Knitwear', description: 'Comfort and elegance for every day.', linkLabel: 'Shop Now', imageUrl: img('mosaic-knitwear.webp'), imagePosition: 'center 15%' },
        { title: 'Dresses for every occasion', description: 'Femininity in every detail.', linkLabel: 'Shop Now', imageUrl: img('mosaic-occasion.webp'), imagePosition: 'center 15%' },
        { title: 'Accessories', description: 'Details that complete your look.', linkLabel: 'Shop Now', imageUrl: img('mosaic-accessories.webp'), imagePosition: 'center 15%' },
        { title: 'Up to 30% off', description: 'On selected styles from the new collection.', linkLabel: 'Shop Now', imageUrl: img('mosaic-sale.webp'), imagePosition: 'center 15%' },
      ],
    }),
    showcase({
      title: 'Spring Collection',
      variant: 'cards',
      layout: 'tiles',
      items: [
        { title: 'Shirts', description: 'Classic styles for every wardrobe.', linkLabel: 'Shop Now', imageUrl: img('spring-shirts.webp'), imagePosition: 'center 15%' },
        { title: 'Light denim', description: 'Freedom and style in every outfit.', linkLabel: 'Shop Now', imageUrl: img('spring-denim.webp'), imagePosition: 'center 15%' },
        { title: 'Blazers', description: 'Structure that speaks for you.', linkLabel: 'Shop Now', imageUrl: img('spring-blazers.webp'), imagePosition: 'center 15%' },
        { title: 'Basic dresses', description: 'Minimalism for every day.', linkLabel: 'Shop Now', imageUrl: img('spring-dresses.webp'), imagePosition: 'center 15%' },
      ],
    }),
    cta({ title: 'Join the list, get 10% off', subtitle: 'Be first to hear about new drops and private sales.', button: 'Subscribe', tone: 'soft' }),
    footer({
      brand: 'Luna Atelier',
      tagline: 'Designed to last. Clothing for modern women, made with care.',
      variant: 'boutique',
      socialLinks: [
        { platform: 'instagram', label: 'Instagram' },
        { platform: 'facebook', label: 'Facebook' },
        { platform: 'youtube', label: 'YouTube' },
        { platform: 'pinterest', label: 'Pinterest' },
      ],
      columns: [
        { title: 'Shop', links: ['Women', 'Dresses', 'Knitwear', 'Shirts', 'Jeans', 'Accessories'] },
        { title: 'About', links: ['Our story', 'Sustainability', 'Careers', 'Press'] },
        { title: 'Help', links: ['Shipping & delivery', 'Returns & exchanges', 'Size guide', 'FAQs', 'Contact us'] },
      ],
      newsletter: { placeholder: 'Your e-mail', buttonLabel: 'Subscribe' },
      copyright: '© 2026 Luna Atelier. All rights reserved.',
    }),
  ],
})
