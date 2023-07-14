import { Onboarding } from './Onboarding';

if (typeof window === "undefined") {
  throw new Error("Onboarding script is being run on the server");
}

// Setting some development vars
// Developers will either overwrite or not use these in production.
(window as any).BASE_URL = process.env.BASE_URL;
(window as any).PAYWALL_LOCK_ADDRESS = process.env.PAYWALL_LOCK_ADDRESS;
(window as any).MAGIC_PUBLISHABLE_KEY = process.env.MAGIC_PUBLISHABLE_KEY;

console.log("Setting global Onboarding variable");
(window as any).Onboarding = Onboarding;