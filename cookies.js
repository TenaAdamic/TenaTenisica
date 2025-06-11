//  If you're using GTM to manage everything (GA, Ads, etc.), replace both hardcoded blocks with a dynamically injected GTM script after consent, like this:

function loadGTM() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
  });

  var gtmScript = document.createElement("script");
  gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-PBNW24MQ";
  gtmScript.async = true;
  document.head.appendChild(gtmScript);

  gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
  });
}

const cookieConsentContent = {
  hr: {
    message: "Koristimo kolačiće za poboljšanje vašeg iskustva.",
    dismiss: "Prihvati",
    deny: "Odbij",
    link: "Saznaj više",
    href: "/pravila-privatnosti.html",
  },
  en: {
    message: "We use cookies to improve your experience.",
    dismiss: "Accept",
    deny: "Decline",
    link: "Learn more",
    href: "/privacy-policy.html",
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
      loadGTM();
    }
  },
  onStatusChange: function (status, chosenBefore) {
    if (this.hasConsented()) {
      loadGTM();
    }
  },
});
