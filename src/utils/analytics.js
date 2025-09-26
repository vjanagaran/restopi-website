// analytics.js - Advanced tracking utilities for RestoPi
// This file provides comprehensive tracking for restaurant-specific events

// Restaurant-specific event tracking
export const RestoPiAnalytics = {
  
  // Track segment page views
  trackSegmentView: (segmentData) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('segment_view', {
        category: 'segment_engagement',
        label: segmentData.name,
        segment_type: segmentData.id,
        average_waste: segmentData.averageWaste,
        outlet_count: segmentData.averageOutlets
      });
      
      // Track custom restaurant data
      window.trackRestaurantData({
        segment: segmentData.id,
        savings: segmentData.averageWaste.replace(/[^\d]/g, ''),
        outlets: segmentData.averageOutlets
      });
    }
  },

  // Track solution page views
  trackSolutionView: (solutionData) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('solution_view', {
        category: 'solution_engagement',
        label: solutionData.name,
        solution_type: solutionData.id,
        monthly_savings: solutionData.roi.savings,
        payback_period: solutionData.roi.paybackPeriod
      });

      window.trackRestaurantData({
        solution: solutionData.id,
        savings: solutionData.roi.savings.replace(/[^\d]/g, '')
      });
    }
  },

  // Track CTA button clicks
  trackCTAClick: (ctaType, location, additionalData = {}) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('cta_click', {
        category: 'conversion',
        label: ctaType,
        cta_type: ctaType,
        page_location: location,
        ...additionalData
      });

      // Track as potential conversion
      if (['demo', 'whatsapp', 'trial', 'calculator'].includes(ctaType.toLowerCase())) {
        window.trackConversion(`${ctaType}_click`, 1);
      }
    }
  },

  // Track form interactions
  trackFormInteraction: (formType, action, fieldName = '') => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('form_interaction', {
        category: 'lead_generation',
        label: `${formType}_${action}`,
        form_type: formType,
        action: action,
        field_name: fieldName
      });
    }
  },

  // Track calculator usage
  trackCalculatorUsage: (calculatorType, inputData, results) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('calculator_usage', {
        category: 'engagement',
        label: calculatorType,
        calculator_type: calculatorType,
        input_daily_orders: inputData.dailyOrders || 0,
        input_ticket_size: inputData.ticketSize || 0,
        calculated_savings: results.monthlySavings || 0,
        value: results.monthlySavings || 0
      });

      // High-value calculator completion
      if (results.monthlySavings > 150000) {
        window.trackConversion('high_value_calculation', results.monthlySavings);
      }
    }
  },

  // Track WhatsApp clicks with context
  trackWhatsAppClick: (context, message = '') => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('whatsapp_click', {
        category: 'communication',
        label: context,
        whatsapp_context: context,
        message_type: message.slice(0, 50), // First 50 chars of message
        value: 10 // WhatsApp leads are valuable
      });

      window.trackConversion('whatsapp_lead', 10);
    }
  },

  // Track demo booking steps
  trackDemoBooking: (step, data = {}) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('demo_booking', {
        category: 'conversion',
        label: step,
        demo_step: step,
        ...data
      });

      // Track major conversion milestones
      if (step === 'completed') {
        window.trackConversion('demo_booked', 50);
      }
    }
  },

  // Track video/content engagement
  trackContentEngagement: (contentType, action, contentName) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('content_engagement', {
        category: 'content',
        label: `${contentType}_${action}`,
        content_type: contentType,
        content_name: contentName,
        action: action
      });
    }
  },

  // Track testimonial interactions
  trackTestimonialView: (testimonialAuthor, location) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('testimonial_view', {
        category: 'social_proof',
        label: testimonialAuthor,
        testimonial_author: testimonialAuthor,
        page_location: location
      });
    }
  },

  // Track pricing page interactions
  trackPricingInteraction: (action, planName = '', planPrice = 0) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('pricing_interaction', {
        category: 'pricing',
        label: action,
        plan_name: planName,
        plan_price: planPrice,
        value: planPrice
      });

      if (action === 'plan_selected') {
        window.trackConversion('pricing_plan_interest', planPrice);
      }
    }
  },

  // Track user journey milestones
  trackJourneyMilestone: (milestone, additionalData = {}) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('user_journey', {
        category: 'journey',
        label: milestone,
        milestone: milestone,
        ...additionalData
      });
    }
  },

  // Track search and navigation
  trackSearch: (searchTerm, results = 0) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('search', {
        category: 'navigation',
        label: searchTerm,
        search_term: searchTerm,
        results_count: results
      });
    }
  },

  // Track external link clicks
  trackExternalLink: (linkUrl, linkText) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('external_link', {
        category: 'navigation',
        label: linkUrl,
        link_url: linkUrl,
        link_text: linkText
      });
    }
  },

  // Track error events
  trackError: (errorType, errorMessage, location) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('error', {
        category: 'error',
        label: errorType,
        error_type: errorType,
        error_message: errorMessage.slice(0, 100),
        page_location: location
      });
    }
  },

  // Track performance metrics
  trackPerformance: (metric, value, location) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('performance', {
        category: 'technical',
        label: metric,
        metric_name: metric,
        metric_value: value,
        page_location: location,
        value: value
      });
    }
  }
};

// Auto-track page load performance
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        RestoPiAnalytics.trackPerformance('page_load_time', 
          Math.round(navigation.loadEventEnd - navigation.fetchStart), 
          window.location.pathname
        );
      }
    }, 1000);
  });
}

export default RestoPiAnalytics;