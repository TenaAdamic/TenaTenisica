// GA4 Configuration
const GA4_MEASUREMENT_ID = 'G-3CT3D1FJMP';

// Initialize dataLayer and gtag BEFORE loading scripts
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
window.gtag = gtag;

// Set default consent state (denied) BEFORE loading GA4
gtag("consent", "default", {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500
});

// Load GA4 script immediately (will respect consent state)
(function() {
  var ga4Script = document.createElement("script");
  ga4Script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_MEASUREMENT_ID;
  ga4Script.async = true;
  document.head.appendChild(ga4Script);
  
  ga4Script.onload = function() {
    // Initialize GA4 with current timestamp
    gtag('js', new Date());
    
    // Configure GA4 with consent mode support
    gtag('config', GA4_MEASUREMENT_ID, {
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure',
      'send_page_view': false // We'll send it manually after consent
    });
    
    console.log("✅ GA4 loaded with Measurement ID:", GA4_MEASUREMENT_ID);
  };
})();

function grantConsent() {
  console.log("Granting consent for analytics and ads");
  
  // Update consent to granted when user accepts cookies
  gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  });
  
  // Send page_view event to GA4 after consent is granted
  gtag('event', 'page_view', {
    'send_to': GA4_MEASUREMENT_ID
  });
  
  // Also reconfigure GA4 to ensure tracking starts
  gtag('config', GA4_MEASUREMENT_ID, {
    'send_page_view': true
  });
  
  console.log("✅ Analytics tracking enabled for:", GA4_MEASUREMENT_ID);
}

function denyConsent() {
  console.log("Denying consent for analytics and ads");
  
  // Keep consent denied when user rejects cookies
  gtag("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
}

const cookieConsentContent = {
  hr: {
    message: "Koristimo kolačiće za poboljšanje vašeg iskustva.",
    dismiss: "Prihvati",
    deny: "Odbij",
    link: "Saznaj više",
    href: "/pravila-privatnosti.html",
    allow: "Prihvati kolačiće",
  },
  en: {
    message: "We use cookies to improve your experience.",
    dismiss: "Accept",
    deny: "Decline",
    link: "Learn more",
    href: "/privacy-policy.html",
    allow: "Allow cookies",
  },
};

const lang = document.documentElement.lang || "hr";
const ccContent = cookieConsentContent[lang] || cookieConsentContent.hr;

window.cookieconsent.initialise({
  type: "opt-in",
  palette: {
    popup: { background: "#b8a9c9" },
    button: { background: "#622569" },
  },
  content: ccContent,
  onInitialise: function (status) {
    console.log("Cookie consent initialized. Status:", status);
    console.log("Has consented:", this.hasConsented());
    
    if (this.hasConsented()) {
      grantConsent();
    } else {
      denyConsent();
    }
  },
  onStatusChange: function (status, chosenBefore) {
    console.log("Cookie consent status changed. New status:", status);
    console.log("Has consented:", this.hasConsented());
    
    if (this.hasConsented()) {
      grantConsent();
    } else {
      denyConsent();
    }
  },
  onRevokeChoice: function() {
    console.log("Cookie consent revoked");
    denyConsent();
  }
});

// Debug: Check if GTM loaded
window.addEventListener('load', function() {
  setTimeout(function() {
    if (window.google_tag_manager) {
      console.log("✅ GTM loaded successfully. Container ID:", Object.keys(window.google_tag_manager)[0]);
    } else {
      console.log("❌ GTM not loaded");
    }
    
    // Check dataLayer
    if (window.dataLayer && window.dataLayer.length > 0) {
      console.log("✅ DataLayer exists with", window.dataLayer.length, "events");
    } else {
      console.log("❌ DataLayer is empty or doesn't exist");
    }
  }, 2000);
});
