// City coordinates for local SEO
const cityData = {
    mumbai: {
      lat: 19.0760,
      lng: 72.8777,
      state: "Maharashtra",
      aliases: ["Bombay", "मुंबई"]
    },
    delhi: {
      lat: 28.6139,
      lng: 77.2090,
      state: "Delhi",
      aliases: ["New Delhi", "दिल्ली"]
    },
    bangalore: {
      lat: 12.9716,
      lng: 77.5946,
      state: "Karnataka",
      aliases: ["Bengaluru", "ಬೆಂಗಳೂರು"]
    }
    // Add more cities
  };

  // Event Schema for webinars
const eventSchema = {
    "@type": "Event",
    "name": "Restaurant Liberation Webinar",
    "startDate": "2025-02-15T10:00:00+05:30",
    "endDate": "2025-02-15T11:00:00+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://restopi.com/webinar"
    },
    "organizer": {
      "@type": "Organization",
      "name": "RestoPi",
      "url": "https://restopi.com"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://restopi.com/webinar-register",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };
  
  // Recipe Schema for solution pages
  const recipeSchema = {
    "@type": "Recipe",
    "name": "Recipe for Restaurant Success",
    "author": {
      "@type": "Organization",
      "name": "RestoPi"
    },
    "datePublished": "2025-01-01",
    "description": "How to save ₹2 lakhs monthly",
    "prepTime": "PT4H",
    "cookTime": "PT30D",
    "totalTime": "PT30D4H",
    "recipeYield": "₹2 Lakhs Monthly Savings",
    "recipeIngredient": [
      "RestoPi Platform",
      "Your existing POS",
      "4 hours setup time"
    ],
    "recipeInstructions": [
      {
        "@type": "HowToStep",
        "text": "Connect RestoPi to your POS"
      }
    ]
  };