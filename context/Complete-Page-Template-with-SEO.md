---
// src/pages/[city]/[segment]-[solution].astro
import Layout from '../../layouts/Layout.astro';
import MasterSEO from '../../components/SEO/MasterSEO.astro';
import SchemaGenerator from '../../components/SEO/SchemaGenerator.astro';

// Dynamic data
const { city, segment, solution } = Astro.params;

// Generate SEO data
const seoData = {
  title: `${city} ${segment} Restaurants Save ₹2 Lakhs Monthly`,
  description: `RestoPi helps ${city} ${segment} owners prevent waste, optimize operations, and get home by 10 PM. Join 100+ restaurants saving ₹2 lakhs monthly.`,
  canonical: `https://restopi.com/${city}/${segment}-${solution}`,
  image: `/og/${city}-${segment}.jpg`,
  city,
  segment,
  solution,
  savings: "₹2 Lakhs"
};

// Schema data
const schemaData = {
  city,
  state: getState(city),
  lat: getCoordinates(city).lat,
  lng: getCoordinates(city).lng,
  questions: [
    {
      question: `How much can ${segment} restaurants in ${city} save with RestoPi?`,
      answer: `${segment} restaurants in ${city} typically save ₹1.5-2.5 lakhs monthly through waste prevention and optimization.`
    },
    // Add more FAQs
  ],
  breadcrumbs: [
    { name: "Home", url: "https://restopi.com" },
    { name: city, url: `https://restopi.com/${city}` },
    { name: `${segment} ${solution}`, url: `https://restopi.com/${city}/${segment}-${solution}` }
  ]
};
---

<Layout>
  <head>
    <MasterSEO {...seoData} />
    <SchemaGenerator type="localBusiness" data={schemaData} />
    <SchemaGenerator type="faq" data={schemaData} />
    <SchemaGenerator type="breadcrumb" data={schemaData} />
  </head>
  
  <body>
    <!-- Content with semantic HTML -->
    <article>
      <header>
        <h1>{city} {segment} Restaurants: Save ₹2 Lakhs Monthly with RestoPi</h1>
        <p class="lead">
          <!-- Answer the query immediately -->
          RestoPi helps {city} {segment} restaurant owners save an average of ₹2 lakhs 
          monthly through AI-powered waste prevention and intelligent operations management.
        </p>
      </header>
      
      <section>
        <h2>How Much Money Are {city} {segment} Restaurants Losing Daily?</h2>
        <!-- Content optimized for featured snippets -->
      </section>
      
      <!-- FAQ Section for Schema -->
      <section itemscope itemtype="https://schema.org/FAQPage">
        <h2>Frequently Asked Questions</h2>
        {schemaData.questions.map(q => (
          <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
            <h3 itemprop="name">{q.question}</h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text">{q.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </article>
  </body>
</Layout>