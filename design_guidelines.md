# Massage Therapist Profile Page - Design Guidelines

## Design Approach
**Reference**: x.ai's radical minimalism meets wellness professionalism. Ultra-clean layouts, extreme contrast, strategic whitespace, and restrained accent color usage create a tech-forward service provider experience.

## Core Design Elements

### A. Color Palette
**Dark Mode Only** (x.ai inspired):
- Background: Pure black (0 0% 0%)
- Text Primary: White (0 0% 100%)
- Text Secondary: Light gray (0 0% 70%)
- Borders/Dividers: Dark gray (0 0% 15%)
- Electric Blue Accent: 210 100% 60%
- Soft Purple Accent: 270 70% 65%
- Success/Active: Use electric blue sparingly

### B. Typography
**Font Stack**: Inter or DM Sans via Google Fonts CDN

**Hierarchy**:
- Hero Name: 4xl/5xl (56-72px), font-bold, tracking-tight
- Section Headlines: 3xl/4xl (36-48px), font-semibold
- Service Titles: xl/2xl, font-medium
- Body Text: base/lg (16-18px), font-normal, text-gray-300
- Captions: sm (14px), text-gray-500

**Treatment**: Minimal line-height (1.2 for headlines, 1.6 for body), generous letter-spacing on headlines (-0.02em).

### C. Layout System
**Spacing Primitives**: Tailwind units of 4, 8, 12, 16, 24, 32 for consistent rhythm

**Grid System**:
- Container max-width: 1280px (max-w-6xl)
- Section padding: py-24 md:py-32
- Content sections: Single column, max-w-4xl centered
- Card grids: 1 column mobile, 2-3 columns desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

**Vertical Rhythm**: Consistent 96-128px spacing between major sections

### D. Component Library

**Navigation** (Top, Fixed):
- Transparent with backdrop blur initially, solid black on scroll
- Logo/Name left, minimal nav links right (About, Services, Testimonials, Contact)
- Subtle bottom border (1px, gray-800)
- Height: 64px

**Hero Section** (100vh):
- Large portrait/treatment room image (full-width, subtle gradient overlay from black at bottom)
- Therapist name overlaid at bottom third: massive white typography
- Credentials/specialty subtitle in gray-400
- Single CTA button (electric blue, rounded-full, px-8 py-4)
- Scroll indicator at bottom center

**About Section**:
- Two-column layout: Professional headshot (400x500px, grayscale with subtle blue tint) left, bio text right
- Bio: 2-3 paragraphs, generous line-height, max-w-2xl
- Certifications list below: minimal badges/text in grid-cols-2 md:grid-cols-4

**Services Grid**:
- 3-column cards (stacked on mobile)
- Each card: Black background, 1px gray-800 border, p-8, hover: border-electric-blue transition
- Service icon (Heroicons, 32px, electric blue)
- Service name (xl, font-semibold)
- Duration + price (gray-400, text-sm)
- Brief description (gray-300, text-sm)
- Card spacing: gap-8

**Compact Testimonials** (x.ai style):
- Horizontal scroll on mobile, 3-column grid desktop
- Minimal cards: p-6, border-l-2 border-purple accent
- Quote text: text-base, italic, gray-200
- Client name: text-sm, font-medium, gray-400
- No photos, no star ratings - pure testimonial text

**Booking/Contact Section**:
- Split layout: Left side contact info (phone, email, location with minimal icons), Right side: inline booking form
- Form: Dark inputs (bg-gray-900, border-gray-800, focus:border-electric-blue), white text, generous padding
- Single-column form fields, stacked labels
- Submit button: electric blue, full-width, rounded-full

**Footer**:
- Minimal: Single row with social links (Heroicons, gray-600, hover:white), copyright center, back-to-top link right
- py-12, border-t border-gray-900

### E. Interactive Elements

**Buttons**:
- Primary: bg-electric-blue, text-black, rounded-full, px-8 py-3, font-medium
- Secondary: border-2 border-white, text-white, rounded-full (use backdrop-blur-md when over images)
- Hover: subtle scale (scale-105), no color changes

**Links**: Underline on hover only, electric blue color, transition-all duration-200

**Cards**: Subtle border transition on hover, no shadows or elevations

## Images

**Hero Image**: 
- Full-width, high-quality photo of serene treatment room or therapist in professional setting
- Aspect ratio: 16:9 or wider
- Style: Professional, calming, well-lit
- Gradient overlay: linear-gradient(to top, rgba(0,0,0,0.9), transparent)

**About Section Image**:
- Professional headshot: 400x500px portrait
- Style: Grayscale with subtle blue color grading, professional attire
- Positioning: Left side of two-column layout

**Optional Service Icons**: 
- Use Heroicons (outline style) for massage types instead of photos
- Keep visual hierarchy through typography, not imagery

## Responsive Behavior

**Mobile-First Breakpoints**:
- Mobile (base): Single column, stacked cards, py-12 section spacing
- Tablet (md: 768px): Two-column grids where appropriate, py-20 spacing
- Desktop (lg: 1024px): Full layouts, py-32 spacing, horizontal testimonial grid

**Critical Mobile Adjustments**:
- Hero text: 3xl on mobile, 5xl on desktop
- Navigation: Hamburger menu on mobile (three-line icon, slide-in drawer)
- Services grid: Stack vertically with full-width cards
- About section: Stack image above text on mobile
- Form: Full-width inputs with larger touch targets (min-h-12)

## Accessibility & Polish

- Maintain WCAG AAA contrast (white on black = 21:1)
- Focus states: 2px electric blue outline
- Skip-to-content link for keyboard navigation
- All interactive elements min 44px touch target
- Reduced motion media query: disable transitions for users who prefer reduced motion