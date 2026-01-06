# Design Guidelines: ISC Internal Security Command Website

## Design Approach
**Reference-Based:** Drawing inspiration from official government and security agency websites (UAE Government Portal, NATO.int, official military sites) combined with the organizational emblem's authoritative aesthetic. This creates a professional, trustworthy digital presence befitting a security command.

## Core Design Principles
1. **Authority & Trust:** Official governmental aesthetic with structured layouts
2. **Clarity:** Information hierarchy supporting mission-critical communication
3. **Professionalism:** Clean, modern styling avoiding decorative excess
4. **Bilingual Excellence:** Seamless Arabic (primary) and English support with proper RTL handling

## Color Palette (From Emblem)
- **Primary Navy:** #1e2a5e (headers, navigation, primary buttons)
- **Sky Blue:** #4a90e2 (accents, links, secondary actions)
- **Light Blue:** #6eb5e8 (backgrounds, hover states)
- **Silver-Gray:** #e8edf2 (borders, subtle backgrounds)
- **Crisp White:** #ffffff (content backgrounds)

## Typography
- **Headings:** Tajawal (700, 600) - Strong Arabic presence
- **Body:** Tajawal (400, 500) - Excellent Arabic readability
- **English Fallback:** Inter for mixed content
- **Scale:** 48px/40px (h1), 32px (h2), 24px (h3), 18px (h4), 16px (body)

## Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 24 for consistent rhythm
- **Container Max-Width:** 1280px (max-w-7xl)
- **Content Width:** 1024px (max-w-6xl) for readable sections
- **Grid System:** 12-column with 2, 3, 4 column variations

## Component Library

### Navigation
Top navigation bar with ISC emblem left (or right for RTL), centered menu links, language toggle
- Height: 80px desktop, 64px mobile
- Sticky positioning with subtle shadow on scroll
- Mobile: Hamburger menu with full-screen overlay

### Hero Section (Home)
Full-height hero (min-h-screen) with emblem-centered composition
- Large emblem display (300px desktop, 200px mobile)
- Organization name in both Arabic and English
- Mission statement subtitle
- Dual CTA buttons: "اكتشف المزيد" (Discover More) + "اتصل بنا" (Contact Us)
- Gradient overlay background (navy to dark blue) with subtle emblem watermark

### Sections (Home)
**Mission & Vision:** Two-column layout with icons representing security pillars
**Departments:** 3-column grid showcasing Internal Security divisions
**Latest News:** Card-based layout (3 columns desktop, 1 mobile) with images
**Statistics:** 4-column metrics display with large numbers and labels

### About Page
**Timeline:** Vertical timeline showing ISC history and milestones
**Leadership:** Grid of officials with photos, titles, and brief bios (3 columns)
**Organizational Structure:** Visual hierarchy diagram
**Values:** Icon + text grid highlighting core principles

### Contact Page
**Two-Column Layout:**
- Left: Contact form (name, email, phone, subject, message)
- Right: Contact information card with emblem, address, phone, email, office hours, map embed

### Footer
**Three-Column Layout:**
- Column 1: Emblem + organization name + brief description
- Column 2: Quick links (About, Services, News, Contact)
- Column 3: Contact info + social media icons
- Bottom: Copyright in Arabic and English

## Images

### Hero Image
Large background image showing Mount Bashan landscape or ISC headquarters building with navy blue gradient overlay (opacity 85%). Emblem prominently centered in foreground.

### Section Images
- **About Page:** Historical photos of Mount Bashan, ISC establishment photos
- **Leadership Photos:** Professional headshots with consistent styling
- **News Cards:** Relevant event/announcement imagery
- **Contact Page:** Map location pin showing ISC headquarters

### Image Treatment
All images maintain professional, authoritative tone. Hero and section backgrounds use subtle overlays ensuring text legibility. Cards feature 16:9 aspect ratio images with consistent border-radius (8px).

## Button Specifications
**Primary:** Navy background, white text, 12px padding vertical, 32px horizontal
**Secondary:** Sky blue border, sky blue text, transparent background
**Hero Buttons on Images:** Background blur (backdrop-blur-sm), semi-transparent white/navy with 80% opacity

## Accessibility & Interactions
- Proper RTL support for Arabic text flow
- Keyboard navigation throughout
- ARIA labels for all interactive elements
- Focus states with 2px sky blue outline
- Smooth scroll behavior between sections
- Minimal animations: fade-in on scroll, subtle hover lifts (4px) on cards
- Mobile-first responsive breakpoints: 640px, 768px, 1024px, 1280px

## Special Considerations
**Bilingual Toggle:** Seamless language switching maintaining page state
**Emblem Usage:** Consistent sizing and placement across all pages
**Form Validation:** Real-time validation with Arabic error messages
**Security Badge:** Trust indicators (SSL, official stamps) in footer

This design creates a commanding, trustworthy digital presence worthy of the Internal Security Command while ensuring exceptional Arabic language support and professional governmental aesthetics.