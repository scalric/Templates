import type { Template } from '../../types/template'
import { lunaAtelier } from './luna-atelier'
import { cta, defineTemplate, features, footer, hero, navbar, showcase, testimonials } from '../builders'

export const commerceTemplates: Template[] = [
  lunaAtelier,
  defineTemplate({
    slug: 'greenleaf-market',
    name: 'Greenleaf Market',
    tagline: 'Fresh, friendly grocery & organic store',
    description:
      'A bright, welcoming store template for organic grocers, farm shops and wellness brands, with delivery messaging front and centre.',
    category: 'ecommerce',
    tags: ['grocery', 'organic', 'delivery', 'wellness'],
    price: 'free',
    popularity: 77,
    createdAt: '2026-06-02',
    author: 'Templates Studio',
    highlights: ['Delivery-focused hero', 'Colourful product grid', 'Subscription box CTA', 'Trust badges section'],
    includedPages: ['Home', 'Shop', 'Subscriptions', 'About', 'Contact'],
    theme: { primary: '#16a34a', primaryText: '#ffffff', secondary: '#dcfce7', background: '#f7fee7', text: '#14301c', muted: '#587061', radius: 'round', headingFont: 'sans' },
    sections: [
      navbar({ brand: 'Greenleaf', icon: 'leaf', links: ['Shop', 'Subscriptions', 'Recipes', 'About'], cta: 'Basket' }),
      hero({ eyebrow: 'Farm to doorstep in 24 hours', title: 'Organic groceries, delivered fresh', subtitle: 'Seasonal fruit, vegetables and pantry staples from certified local farms.', primaryCta: 'Start shopping', secondaryCta: 'Build a box', layout: 'split', imageLabel: 'Seasonal harvest', imageIcon: 'leaf' }),
      features({ title: 'Why Greenleaf', items: [
        { icon: 'truck', title: 'Same-day delivery', description: 'Order before noon, eat tonight.' },
        { icon: 'leaf', title: '100% organic', description: 'Certified farms, zero pesticides.' },
        { icon: 'package', title: 'Plastic-free', description: 'Compostable packaging only.' },
      ] }),
      showcase({ title: 'Fresh this week', variant: 'products', items: [
        { title: 'Heirloom tomatoes', price: '₹120 / kg', tag: 'Local', icon: 'leaf' },
        { title: 'Baby spinach', price: '₹60 / bunch', tag: 'Fresh', icon: 'leaf' },
        { title: 'Alphonso mangoes', price: '₹480 / dozen', tag: 'Seasonal', icon: 'sparkles' },
        { title: 'Cold-pressed oil', price: '₹650 / L', tag: 'Pantry', icon: 'package' },
      ] }),
      testimonials({ title: 'Happy households', items: [
        { quote: 'Everything arrives crisp and fresh. We have cancelled our supermarket run.', name: 'Pooja V.', role: 'Weekly subscriber' },
        { quote: 'You can taste the difference in the vegetables.', name: 'Ravi N.', role: 'Customer' },
        { quote: 'The subscription box is genuinely good value.', name: 'Clara S.', role: 'Customer' },
      ] }),
      cta({ title: 'Get your first box for less', subtitle: '20% off your first subscription order.', button: 'Claim offer', tone: 'primary' }),
      footer({ brand: 'Greenleaf Market', tagline: 'Good food, grown well.', columns: [{ title: 'Shop', links: ['Fruit', 'Vegetables', 'Pantry'] }, { title: 'Company', links: ['Our farms', 'Careers', 'Press'] }, { title: 'Help', links: ['Delivery', 'FAQ', 'Contact'] }], copyright: '© 2026 Greenleaf Market' }),
    ],
  }),
  defineTemplate({
    slug: 'northline-apparel',
    name: 'Northline Apparel',
    tagline: 'Streetwear & everyday clothing online',
    description:
      'A bold clothing e-commerce template for fashion and apparel brands. Drop-led hero, size-aware product grid, shipping and returns reassurance and a sign-up prompt for new drops.',
    category: 'ecommerce',
    tags: ['fashion', 'apparel', 'clothing', 'streetwear', 'store'],
    price: 'free',
    popularity: 86,
    createdAt: '2026-10-22',
    isNew: true,
    author: 'Templates Studio',
    highlights: ['Drop-led hero with shop CTA', 'Product grid with size and price tags', 'Shipping and returns reassurance', 'New-drop sign-up call to action'],
    includedPages: ['Home', 'Shop', 'Product', 'Size guide', 'Cart'],
    theme: {
      primary: '#111827',
      primaryText: '#ffffff',
      secondary: '#e5e7eb',
      background: '#ffffff',
      text: '#111827',
      muted: '#6b7280',
      radius: 'sharp',
      headingFont: 'sans',
    },
    sections: [
      navbar({ brand: 'Northline', icon: 'bag', links: ['New in', 'Men', 'Women', 'Accessories', 'Sale'], cta: 'Bag (0)', showSearch: true }),
      hero({
        eyebrow: 'Spring drop · Out now',
        title: 'Everyday clothing with an edge',
        subtitle: 'Relaxed fits, heavyweight cotton and layers built for the city. New styles land every Friday.',
        primaryCta: 'Shop the drop',
        secondaryCta: 'Size guide',
        layout: 'split',
        imageLabel: 'Spring drop lookbook',
        imageIcon: 'bag',
      }),
      showcase({
        title: 'Best sellers',
        subtitle: 'The pieces our customers reach for again and again.',
        variant: 'products',
        items: [
          { title: 'Heavyweight hoodie', price: '₹3,490', tag: 'Best seller', icon: 'shield' },
          { title: 'Relaxed denim jacket', price: '₹4,990', tag: 'New', icon: 'bag' },
          { title: 'Organic tee — 3 pack', price: '₹1,890', tag: 'Value', icon: 'star' },
          { title: 'Wide-leg chinos', price: '₹2,790', tag: 'Limited', icon: 'sparkles' },
        ],
      }),
      features({ title: 'Shop with confidence', items: [
        { icon: 'truck', title: 'Free delivery', description: 'On every order over ₹2,500.' },
        { icon: 'shield', title: 'Easy 30-day returns', description: 'Wrong size? Exchange it in two taps.' },
        { icon: 'leaf', title: 'Responsibly sourced', description: 'Organic cotton and certified mills.' },
        { icon: 'lock', title: 'Secure checkout', description: 'Cards, UPI and cash on delivery.' },
      ] }),
      testimonials({ title: 'Wearing it every day', items: [
        { quote: 'The fit is exactly what I wanted. The hoodie is already my favourite piece.', name: 'Aarav P.', role: 'Verified buyer' },
        { quote: 'Fast delivery and the sizing guide was spot on. Will be back for the next drop.', name: 'Ishita R.', role: 'Verified buyer' },
      ] }),
      cta({ title: 'Be first to the next drop', subtitle: 'Sign up for early access, private sales and 10% off your first order.', button: 'Get early access', tone: 'primary' }),
      footer({ brand: 'Northline', tagline: 'Wear what moves you.', columns: [
        { title: 'Shop', links: ['New in', 'Men', 'Women', 'Accessories'] },
        { title: 'Help', links: ['Shipping', 'Returns', 'Size guide', 'Contact'] },
        { title: 'Company', links: ['Our story', 'Sustainability', 'Careers'] },
      ], copyright: '© 2026 Northline Apparel' }),
    ],
  }),
]
