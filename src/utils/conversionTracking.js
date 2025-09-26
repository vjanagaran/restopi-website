// conversionTracking.js - Advanced conversion tracking for RestoPi
// This file defines conversion goals and tracks the complete customer journey

export const ConversionGoals = {
  // Primary conversion goals with values (in INR)
  DEMO_BOOKED: { value: 5000, label: 'Demo Booked' },
  WHATSAPP_LEAD: { value: 1000, label: 'WhatsApp Lead' },
  CALCULATOR_COMPLETED: { value: 500, label: 'Calculator Completed' },
  TRIAL_STARTED: { value: 10000, label: 'Trial Started' },
  HIGH_VALUE_ENGAGEMENT: { value: 2000, label: 'High Value Engagement' },
  
  // Micro conversions
  SEGMENT_ENGAGED: { value: 100, label: 'Segment Engaged' },
  SOLUTION_EXPLORED: { value: 200, label: 'Solution Explored' },
  TESTIMONIAL_VIEWED: { value: 50, label: 'Testimonial Viewed' },
  PRICING_VIEWED: { value: 300, label: 'Pricing Viewed' },
  CONTACT_ATTEMPTED: { value: 800, label: 'Contact Attempted' }
};

export class ConversionTracker {
  constructor() {
    this.sessionData = this.getSessionData();
    this.conversionPath = [];
    this.setupTracking();
  }

  getSessionData() {
    return {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      referrer: document.referrer,
      utm: this.getUTMParameters(),
      device: this.getDeviceInfo(),
      firstPage: window.location.pathname
    };
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      source: urlParams.get('utm_source'),
      medium: urlParams.get('utm_medium'),
      campaign: urlParams.get('utm_campaign'),
      term: urlParams.get('utm_term'),
      content: urlParams.get('utm_content')
    };
  }

  getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screen: `${screen.width}x${screen.height}`,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };
  }

  setupTracking() {
    // Track page views with conversion context
    this.trackPageView();
    
    // Track form interactions
    this.setupFormTracking();
    
    // Track high-value actions
    this.setupHighValueTracking();
    
    // Track exit intent
    this.setupExitIntentTracking();
  }

  trackPageView() {
    const pageData = {
      path: window.location.pathname,
      title: document.title,
      timestamp: Date.now()
    };
    
    this.conversionPath.push({
      type: 'page_view',
      ...pageData
    });

    // Send to GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view_enhanced', {
        page_path: pageData.path,
        page_title: pageData.title,
        session_id: this.sessionData.sessionId,
        referrer: this.sessionData.referrer,
        utm_source: this.sessionData.utm.source,
        utm_medium: this.sessionData.utm.medium,
        utm_campaign: this.sessionData.utm.campaign
      });
    }
  }

  setupFormTracking() {
    // Track all form interactions
    document.addEventListener('focusin', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        this.trackFormInteraction('field_focus', e.target);
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        this.trackFormInteraction('field_complete', e.target);
      }
    });

    document.addEventListener('submit', (e) => {
      if (e.target.tagName === 'FORM') {
        this.trackFormSubmission(e.target);
      }
    });
  }

  trackFormInteraction(action, field) {
    const formData = {
      action: action,
      field_name: field.name || field.id || 'unnamed',
      field_type: field.type || field.tagName.toLowerCase(),
      form_id: field.form ? (field.form.id || 'unnamed_form') : 'no_form'
    };

    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_interaction', {
        event_category: 'forms',
        event_label: `${formData.form_id}_${formData.action}`,
        field_name: formData.field_name,
        field_type: formData.field_type,
        session_id: this.sessionData.sessionId
      });
    }
  }

  trackFormSubmission(form) {
    const formId = form.id || 'unnamed_form';
    
    // Check if this is a high-value form
    const isHighValue = ['demo', 'contact', 'trial', 'consultation'].some(keyword => 
      formId.toLowerCase().includes(keyword)
    );

    const conversionValue = isHighValue ? ConversionGoals.DEMO_BOOKED.value : 500;

    this.trackConversion('form_submission', conversionValue, {
      form_id: formId,
      form_type: isHighValue ? 'high_value' : 'standard'
    });
  }

  setupHighValueTracking() {
    // Track button clicks with high conversion value
    document.addEventListener('click', (e) => {
      const element = e.target.closest('a, button');
      if (!element) return;

      const text = element.textContent.toLowerCase();
      const href = element.href || '';
      
      // High-value actions
      if (this.isHighValueAction(text, href)) {
        this.trackHighValueAction(element, text, href);
      }
    });
  }

  isHighValueAction(text, href) {
    const highValueKeywords = [
      'demo', 'trial', 'free', 'book', 'schedule', 'contact',
      'whatsapp', 'call', 'consultation', 'get started', 'sign up'
    ];
    
    return highValueKeywords.some(keyword => 
      text.includes(keyword) || href.includes(keyword)
    );
  }

  trackHighValueAction(element, text, href) {
    let conversionType = 'high_value_action';
    let value = ConversionGoals.HIGH_VALUE_ENGAGEMENT.value;

    // Determine specific conversion type
    if (text.includes('demo') || text.includes('book')) {
      conversionType = 'demo_intent';
      value = ConversionGoals.DEMO_BOOKED.value;
    } else if (href.includes('wa.me') || text.includes('whatsapp')) {
      conversionType = 'whatsapp_click';
      value = ConversionGoals.WHATSAPP_LEAD.value;
    } else if (text.includes('trial') || text.includes('free')) {
      conversionType = 'trial_intent';
      value = ConversionGoals.TRIAL_STARTED.value;
    }

    this.trackConversion(conversionType, value, {
      element_text: text.slice(0, 50),
      element_href: href.slice(0, 100),
      element_location: this.getElementLocation(element)
    });
  }

  getElementLocation(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      section: this.getPageSection(rect.top)
    };
  }

  getPageSection(top) {
    const scrollPosition = window.scrollY + top;
    const pageHeight = document.body.scrollHeight;
    const percentage = (scrollPosition / pageHeight) * 100;
    
    if (percentage < 25) return 'header';
    if (percentage < 50) return 'above_fold';
    if (percentage < 75) return 'middle';
    return 'footer';
  }

  setupExitIntentTracking() {
    let exitIntentTracked = false;
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !exitIntentTracked) {
        exitIntentTracked = true;
        this.trackExitIntent();
      }
    });

    // Track mobile scroll-up exit intent
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      if (window.scrollY < lastScrollY && window.scrollY < 100 && !exitIntentTracked) {
        exitIntentTracked = true;
        this.trackExitIntent();
      }
      lastScrollY = window.scrollY;
    });
  }

  trackExitIntent() {
    const timeOnPage = (Date.now() - this.sessionData.startTime) / 1000;
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exit_intent', {
        event_category: 'engagement',
        event_label: 'exit_intent_detected',
        time_on_page: Math.round(timeOnPage),
        scroll_depth: this.getScrollDepth(),
        session_id: this.sessionData.sessionId
      });
    }
  }

  getScrollDepth() {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    return Math.round((scrolled / total) * 100);
  }

  trackConversion(conversionType, value, additionalData = {}) {
    this.conversionPath.push({
      type: 'conversion',
      conversionType: conversionType,
      value: value,
      timestamp: Date.now(),
      ...additionalData
    });

    // Send to GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        event_category: 'conversion',
        event_label: conversionType,
        value: value,
        currency: 'INR',
        transaction_id: this.generateTransactionId(),
        session_id: this.sessionData.sessionId,
        conversion_path_length: this.conversionPath.length,
        time_to_conversion: (Date.now() - this.sessionData.startTime) / 1000,
        ...additionalData
      });

      // Enhanced ecommerce conversion
      gtag('event', 'purchase', {
        transaction_id: this.generateTransactionId(),
        value: value,
        currency: 'INR',
        items: [{
          item_id: conversionType,
          item_name: conversionType,
          item_category: 'conversion',
          quantity: 1,
          price: value
        }]
      });
    }

    // Store conversion data for attribution
    this.storeConversionData(conversionType, value, additionalData);
  }

  generateTransactionId() {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  storeConversionData(conversionType, value, additionalData) {
    try {
      const conversions = JSON.parse(localStorage.getItem('restopi_conversions') || '[]');
      conversions.push({
        type: conversionType,
        value: value,
        timestamp: Date.now(),
        sessionId: this.sessionData.sessionId,
        path: this.conversionPath.slice(),
        ...additionalData
      });
      
      // Keep only last 10 conversions
      if (conversions.length > 10) {
        conversions.splice(0, conversions.length - 10);
      }
      
      localStorage.setItem('restopi_conversions', JSON.stringify(conversions));
    } catch (e) {
      console.warn('Could not store conversion data:', e);
    }
  }

  // Get conversion attribution data
  getAttributionData() {
    return {
      sessionData: this.sessionData,
      conversionPath: this.conversionPath,
      totalValue: this.conversionPath
        .filter(event => event.type === 'conversion')
        .reduce((sum, event) => sum + (event.value || 0), 0)
    };
  }
}

// Initialize conversion tracking when DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.RestoPiConversionTracker = new ConversionTracker();
  });
}

export default ConversionTracker;