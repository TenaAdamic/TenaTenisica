// Initialize dataLayer and gtag
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
window.gtag = gtag;

// IMPORTANT: Set default consent state BEFORE loading GTM
gtag("consent", "default", {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  wait_for_update: 500
});

// Load GTM immediately (it will respect the consent state)
(function() {
  // GTM Container
  var gtmScript = document.createElement("script");
  gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-PBNW24MQ";
  gtmScript.async = true;
  document.head.appendChild(gtmScript);
  
  // Add GTM noscript iframe
  window.addEventListener('load', function() {
    if (!document.querySelector('noscript iframe[src*="googletagmanager.com"]')) {
      var noscript = document.createElement("noscript");
      noscript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PBNW24MQ" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
      document.body.insertBefore(noscript, document.body.firstChild);
    }
  });
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
  
  // Fire a page_view event after consent is granted
  gtag('event', 'page_view', {
    'send_to': 'GTM-PBNW24MQ'
  });
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
