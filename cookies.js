//  If you're using GTM to manage everything (GA, Ads, etc.), replace both hardcoded blocks with a dynamically injected GTM script after consent, like this:

// Initialize consent mode with default denied state
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
window.gtag = gtag;

// Set default consent state to denied before GTM loads
gtag("consent", "default", {
  ad_storage: "denied",
  analytics_storage: "denied",
  wait_for_update: 500 // Wait up to 500ms for consent update
});

// Load GTM script immediately but with denied consent
(function() {
  var gtmScript = document.createElement("script");
  gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-PBNW24MQ";
  gtmScript.async = true;
  document.head.appendChild(gtmScript);
})();

function grantConsent() {
  // Update consent to granted when user accepts cookies
  gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
  });
}

function denyConsent() {
  // Keep consent denied when user rejects cookies
  gtag("consent", "update", {
    ad_storage: "denied",
    analytics_storage: "denied",
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
    if (this.hasConsented()) {
      grantConsent();
    } else {
      denyConsent();
    }
  },
  onStatusChange: function (status, chosenBefore) {
    if (this.hasConsented()) {
      grantConsent();
    } else {
      denyConsent();
    }
  },
  onRevokeChoice: function() {
    denyConsent();
  }
});
