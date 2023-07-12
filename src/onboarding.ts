type OnboardingConstructorArgs = {
  
}

class Onboarding {
  constructor (args: OnboardingConstructorArgs) {
    
  }
}

if (typeof window !== 'undefined') {
  (window as any).Onboarding = Onboarding;
} else {
  throw new Error('Onboarding script is being run on the server');
}