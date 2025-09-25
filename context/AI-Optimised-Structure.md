restopi-liberation/
├── src/
│   ├── pages/                    # AI generates new pages here
│   │   ├── index.astro           # Homepage
│   │   ├── [city]/               # Dynamic city pages
│   │   │   └── [solution].astro # AI replicates template
│   │   ├── segments/             
│   │   │   ├── fine-dining.mdx  # AI writes MDX
│   │   │   ├── qsr.mdx
│   │   │   └── [segment].astro  # Template for AI
│   │   ├── solutions/
│   │   │   ├── waste-prevention.mdx
│   │   │   ├── home-by-10pm.mdx
│   │   │   └── [solution].astro
│   │   └── tools/
│   │       ├── liberation-calculator.astro
│   │       └── roi-calculator.astro
│   ├── components/               # Reusable blocks for AI
│   │   ├── LiberationHero.astro
│   │   ├── WasteCounter.astro
│   │   ├── ROICalculator.astro
│   │   ├── WhatsAppCTA.astro
│   │   └── TestimonialCard.astro
│   ├── layouts/
│   │   └── LiberationLayout.astro # Master template
│   └── data/
│       ├── cities.json          # AI updates this
│       ├── segments.json        # AI adds new segments
│       └── testimonials.json    # AI adds stories
├── public/
│   └── images/                  # AI generates via DALL-E
└── package.json