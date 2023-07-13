const BASE_URL = 'http://localhost:3000';
const CTA_ID = 'join-dao-cta-btn';
const ROOT_ID = 'onboarding-frame';
const NETWORK_ID = 'goerli';

const MAGIC_PUBLISHABLE_KEY = "pk_live_...";
const MAGIC_SSO_PROVIDERS = ['discord'];

const PAYWALL_NAME = "DAO Membership";
const PAYWALL_LOCK_ADDRESS = "0x...";

const setup = () => {
  console.log("Setting up page for onboarding UI...");

  if (typeof window?.Magic === "undefined") {
    throw new Error("No Magic object found!");
  }

  if (typeof window?.Onboarding === "undefined") {
    throw new Error("No Onboarding object found!");
  }

  const onboarding = new Onboarding({
    root: document.getElementById(ROOT_ID),
    magicConfig: {
      apiKey: MAGIC_PUBLISHABLE_KEY,
      network: NETWORK_ID,
      ssoProviders: MAGIC_SSO_PROVIDERS,
    },
    unlockConfig: {
      name: PAYWALL_NAME,
      network: NETWORK_ID,
      lockAddress: PAYWALL_LOCK_ADDRESS,
    },
  });

  // Setup click handler to render onboarding UI
  const ctaElement = document.getElementById(CTA_ID);
  ctaElement.onclick = e => {
    e.preventDefault();
    onboarding.render(document.getElementById(ROOT_ID));
  };
};

setup();
