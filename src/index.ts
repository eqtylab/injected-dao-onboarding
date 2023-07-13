import { Onboarding } from './Onboarding';

if (typeof window === "undefined") {
  throw new Error("Onboarding script is being run on the server");
}

console.log("Setting global Onboarding variable");
(window as any).Onboarding = Onboarding;