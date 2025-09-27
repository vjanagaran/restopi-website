# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RestoPi Website - An AI-native marketing website for the RestoPi platform that helps restaurant owners save ₹2 lakhs monthly and get home by 10 PM. Built with Astro, Tailwind CSS, and deployed on Vercel.

## Commands

### Development
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the built site locally

### No testing or linting commands are configured in this project.

## Architecture

### Tech Stack
- **Framework**: Astro 5.x with MDX support
- **Styling**: Tailwind CSS with custom colors (pi-indigo, spiced-saffron)
- **Deployment**: Vercel adapter configured
- **Analytics**: Google Analytics 4 (ID: G-9PQMMM6L6R)
- **Sitemap**: Auto-generated with priority rules

### Project Structure
```
src/
├── components/      # Reusable Astro components
│   ├── SEO/        # SEO-related components
│   ├── Footer.astro
│   ├── Navigation.astro
│   └── WhatsAppButton.astro
├── data/           # JSON data files
│   ├── segments.json    # Restaurant segment definitions
│   └── solutions.json   # Solution offerings
├── layouts/        # Page layouts
│   └── BaseLayout.astro # Main layout with GA4 tracking
├── pages/          # File-based routing
│   ├── index.astro      # Homepage
│   ├── segments/        # Restaurant segment pages
│   └── solutions/       # Solution pages
└── utils/          # Utility functions
    ├── analytics.js     # Analytics tracking helpers
    └── conversionTracking.js # Conversion tracking
```

### Key Patterns

1. **Page Creation**: All pages use `BaseLayout.astro` wrapper with SEO props
2. **WhatsApp Integration**: Default phone +91 98842-48927, message template: "I want to save ₹2 lakhs monthly with RestoPi!"
3. **Analytics**: Enhanced GA4 tracking with custom parameters for segment, solution, and savings_potential
4. **Sitemap**: Automatic generation with custom priorities (homepage: 1.0, segments/solutions: 0.9)

## Brand Guidelines (from .cursorrules)

### Core Messaging
- ALWAYS mention "₹2 Lakhs monthly savings" and "Home by 10 PM"
- Use "liberation" instead of "optimization"
- Show money, not metrics

### Brand Colors
- Pi Indigo: `#2D2A6E`
- Spiced Saffron: `#C2410C`
- Success Green: `#16A34A`
- Danger Red: `#DC2626`
- Deep Teal: `#0F766E`

### Target Segments
1. Fine Dining
2. QSR (Quick Service Restaurants)
3. Casual Dining
4. Cloud Kitchens
5. Banquet Halls & Catering

## Development Notes

- Site URL: https://www.restopi.com
- Mobile-first responsive design required
- Performance target: <3s load time
- Static generation preferred over SSR
- No test files currently in the project
- All content uses Indian context (₹, Indian cities)